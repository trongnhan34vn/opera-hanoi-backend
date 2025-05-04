import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  ForbiddenException,
  InternalServerException,
  IS3Service,
  IS3ServiceToken,
  KeycloakRoleEnum,
  ResourceException,
  UnauthorizedException,
  writeCsvFile,
} from 'common';
import { LoggerFactory } from 'common/dist/factory/impl/logger.factory.impl';
import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import * as mime from 'mime-types';
import {
  generatePassword,
  getEmailFromAccessToken,
  getRolesFromAccessToken,
} from 'src/uttil/utils';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';
import { UserSignInDto } from '../dto/request/UserSignIn.dto';
import { UserSignUpDto } from '../dto/request/UserSignUp.dto';
import { KeycloakTokenResponse } from '../dto/response/KeycloakTokenResponse.dto';
import { AccountService } from './account.service';
import { CartService } from './cart.service';
import { KeycloakService } from './keycloak.service';
import * as path from 'path';
import { ChangePasswordDto } from 'src/dto/request/change.password.dto';
import { UserKc } from 'src/dto/response/UserKc.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly logger: LoggerFactory,
    private readonly accountService: AccountService,
    private readonly cartService: CartService,
    @Inject(IS3ServiceToken)
    private readonly s3Service: IS3Service,
  ) {}

  /**
   * sign in
   * Call sign in API of Keycloak
   * @param userLogin
   * @return KeycloakToken
   */
  // @Log()
  async signIn(userLogin: UserSignInDto): Promise<KeycloakTokenResponse> {
    try {
      return await this.keycloakService.signIn(userLogin);
    } catch (error) {
      this.logger.error(
        `Error occurred while signing in user [${userLogin.email}].`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Create Admin Account
   * 1. dto: email: string, roles: []StringRole
   * 2. auto generate password
   * 3. call sign up
   *
   */
  async createAdminAccount(accountDto: UserSignUpDto) {
    const password = generatePassword();
    accountDto.password = password;
    const roleArr = Array.from(accountDto.roles);

    roleArr.push(KeycloakRoleEnum.CHANGE_SELF_PASSWORD_ROLE);

    accountDto.roles = new Set(roleArr);

    let userIdAccountService = '';
    let rootToken = '';
    try {
      const token = await this.keycloakService.getAdminAccess();
      rootToken = token;
      // 1. sign up with Keycloak server
      const createdUser = await this.keycloakService.signUp(accountDto);

      // 2. save user info into account-service
      const userId = await this.accountService.save(
        {
          ...accountDto,
          keycloakId: createdUser.id,
        },
        token,
      );
      userIdAccountService = userId;

      // create .csv file and send to s3
      const data = {
        username: accountDto.email,
        password: accountDto.password,
      };
      const csvContent = {
        fields: ['Username', 'Password'],
        data: [data.username, data.password],
      };

      const filename = 'credentials_' + uuidv4() + '.csv';
      const credentialsPath = path.join(__dirname, '..', 'credentials');
      const localPath = credentialsPath + '/' + filename;

      this.logger.log('Write CSV file.');
      writeCsvFile(localPath, csvContent);
      this.logger.log(`Write CSV file success.`);
      this.logger.log(`Credential File Path: [${localPath}]`);

      this.logger.log('Send file to S3.');
      const file = this.createMulterFileFromPath(localPath);
      const s3FilePath = 'credentials/' + filename;
      await this.s3Service.uploadFileToS3(file, s3FilePath);
      this.logger.log('Send file to S3 success.');
      this.logger.log(`S3 File Path: [${s3FilePath}]`);

      return true;
    } catch (error) {
      this.logger.error(
        `Error occurred while signing up user [${accountDto.email}].`,
        error.stack,
      );
      // START TRANSACTION
      await this.keycloakService.signUpTransaction(accountDto);
      await this.accountService.deleteUserById(userIdAccountService, rootToken);
      // START TRANSACTION
      throw error;
    }
  }

  private createMulterFileFromPath(path: string) {
    const fileBuffer = readFileSync(path);
    const mimeType = mime.lookup(path) || 'application/octet-stream';
    const fileName = path.split('/').pop() || 'unknown';
    const bufferStream = new Readable();
    bufferStream.push(fileBuffer);
    bufferStream.push(null);
    const multerFile: Express.Multer.File = {
      fieldname: 'file', // Tên trường trong form
      originalname: fileName, // Lấy tên file từ path
      encoding: '7bit', // Thông thường sẽ là '7bit' hoặc 'base64' tùy vào cách upload
      mimetype: mimeType, // Bạn có thể thay thế với mime type thực của file
      buffer: fileBuffer, // Buffer của file
      size: fileBuffer.length, // Kích thước của file
      path: path, // Đường dẫn của file
      stream: bufferStream,
      filename: fileName,
      destination: path,
    };

    return multerFile;
  }

  async signInAdmin(userLogin: UserSignInDto) {
    try {
      const response = await this.signIn(userLogin);
      const tokenResponse = plainToInstance(KeycloakTokenResponse, response, {
        excludeExtraneousValues: true,
      });
      const accessToken = tokenResponse.accessToken;
      const roles = getRolesFromAccessToken(accessToken);

      let isAdmin = true;
      roles.forEach((role) => {
        if (role.includes(KeycloakRoleEnum.CUSTOMER_ROLE)) {
          isAdmin = false;
        }
      });
      if (!isAdmin) {
        throw new ForbiddenException(
          `Account [${userLogin.email}] doesn't have permission login to this app`,
          'Account has no permission',
        );
      }
      let isResetPassword = false;

      // avoid super admin account
      if (userLogin.email !== 'admin@gmail.com') {
        const rootToken = await this.keycloakService.getAdminAccess();
        const targetUser = await this.accountService.findUserByEmail(
          userLogin.email,
          rootToken,
        );

        if (targetUser['createdAt'] === targetUser['updatedAt']) {
          isResetPassword = true;
        }
      }

      tokenResponse.email = getEmailFromAccessToken(accessToken);
      tokenResponse.isResetPassword = isResetPassword;
      return tokenResponse;
    } catch (error) {
      this.logger.error(
        `Error occurred while signing in admin account [${userLogin.email}]`,
        error,
      );

      const errorResponse = error as ResourceException;
      const status = errorResponse.getStatus();
      const isUnauthorized = status === HttpStatus.UNAUTHORIZED;
      if (isUnauthorized) {
        throw new UnauthorizedException(
          'Unauthorized',
          'Invalid User Credential',
        );
      }

      throw error;
    }
  }

  /**
   * sign up
   * @param userSignUp
   */
  // @Log()
  async signUp(userSignUp: UserSignUpDto): Promise<boolean> {
    let userIdAccountService = '';
    let rootToken = '';
    try {
      const token = await this.keycloakService.getAdminAccess();
      rootToken = token;
      // 1. sign up with Keycloak server
      const createdUser = await this.keycloakService.signUp(userSignUp);

      // 2. save user info into account-service
      const userId = await this.accountService.save(
        {
          ...userSignUp,
          keycloakId: createdUser.id,
        },
        token,
      );
      userIdAccountService = userId;

      // 3. create cart
      const { isAdmin } = userSignUp;
      if (!isAdmin) {
        await this.cartService.createCart(userId);
      }

      return true;
    } catch (error) {
      this.logger.error(
        `Error occurred while signing up user [${userSignUp.email}].`,
        error.stack,
      );
      // START TRANSACTION
      await this.keycloakService.signUpTransaction(userSignUp);
      await this.accountService.deleteUserById(userIdAccountService, rootToken);
      // START TRANSACTION
      throw error;
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto, email: string) {
    this.logger.log('Check old password.');
    const userLogin = { password: changePasswordDto.oldPassword, email };
    const tokenResponse = await this.keycloakService.signIn(userLogin);
    this.logger.log('Check old password ok.');

    if (!tokenResponse) {
      throw new UnauthorizedException(
        'Unauthorized',
        'Invalid user credentials',
      );
    }

    this.logger.log('Change Password');
    const token = await this.keycloakService.getAdminAccess();
    const user: UserKc = await this.keycloakService.findUserByEmail(
      email,
      token,
    );

    await this.keycloakService.changePassword(
      changePasswordDto,
      token,
      user.id,
    );

    this.logger.log('Change Password success');
    return true;
  }
}
