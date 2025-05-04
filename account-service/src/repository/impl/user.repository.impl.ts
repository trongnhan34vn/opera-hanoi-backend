import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository.interface';
import { User } from 'src/entity/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { NotFoundException } from 'common';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectModel(User)
    private readonly UserModel: typeof User,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.UserModel.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByPhone(phone: string): Promise<User> {
    const user = await this.UserModel.findOne({ where: { phone } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.UserModel.findAll();
  }
  async create(entity: User, transaction: Transaction): Promise<User> {
    return await entity.save({ transaction });
  }
  async update(entity: User): Promise<User> {
    return await entity.update({
      ...entity,
      updatedAt: new Date(Date.now()),
    });
  }
  async findById(id: string): Promise<User> {
    const user = await this.UserModel.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    await user.destroy();
  }
}
