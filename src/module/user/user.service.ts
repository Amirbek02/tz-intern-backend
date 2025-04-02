import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomLogger } from 'src/helpers/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly logger: CustomLogger,
  ) {}
  create(createUserDto: CreateUserDto, refId: string) {
    this.logger.info(`Creating user ${JSON.stringify(createUserDto)}`, refId);
    try {
      return this.userRepository.save(createUserDto);
    } catch (error) {
      this.logger.error(`Error creating user ${error}`, refId);
      throw error;
    }
  }

  findAll(refId: string) {
    this.logger.info('Fetching all users', refId);
    try {
      return this.userRepository.find();
    } catch (error) {
      this.logger.error(`Error fetching users ${error}`, refId);
      throw error;
    }
  }

  findOne(id: number, refId: string) {
    this.logger.info(`Fetching user with id ${id}`, refId);
    try {
      return this.userRepository.findOneBy({ id });
    } catch (error) {
      this.logger.error(`Error fetching user ${error}`, refId);
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto, refId: string) {
    this.logger.info(`Updating user with id ${id}`, refId);
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new Error('User not found');
      }
      await this.userRepository.update(id, updateUserDto);
      return { ...user, ...updateUserDto };
    } catch (error) {
      this.logger.error(`Error updating user ${error}`, refId);
      throw error;
    }
  }

  async remove(id: number, refId: string) {
    this.logger.info(`Deleting user with id ${id}`, refId);
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new Error('User not found');
      }
      return this.userRepository.delete(id);
    } catch (error) {
      this.logger.error(`Error deleting user ${error}`, refId);
      throw error;
    }
  }
}
