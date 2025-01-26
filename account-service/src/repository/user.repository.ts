import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entity/user.entity';
import { IUserRepository } from '../interface/user.interface';
import { Injectable } from '@nestjs/common';
import { ErrorMessage, ResourceException } from 'common-lib';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async delete(id: string) {
    const user = await this.findById(id);
    await user.destroy();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) {
      throw new ResourceException(
        ErrorMessage.NOT_FOUND.getCode,
        ErrorMessage.NOT_FOUND.getMessage,
        `User not found with id [${id}]`,
      );
    }
    return user;
  }

  async save(user: User): Promise<User> {
    // if param don't have id => create
    if (!user.id) {
      return await this.userModel.create(user);
    }
    // param have id => update
    await this.userModel.update(user, { where: { id: user.id } });
    return await this.findById(user.id);
  }
}
