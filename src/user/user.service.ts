import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserInterface } from 'src/common/interfaces/updateUserInterface';
import { CreateUserDto } from '../common/dto/createUserDto';
import { EncryptionService } from 'src/auth/encrypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly encService: EncryptionService
  ) { }

  async registerUser(createUserDto: CreateUserDto) {
    createUserDto.password = await this.encService
      .hash(createUserDto.password)
    console.log("hash: ", createUserDto.password)
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findOne({ _id: id }).exec();
  }

  findOneAndUpdate(id: string, updateUser: UpdateUserInterface) {
    return this.userModel.findOneAndUpdate({ _id: id }, updateUser).exec();
  }

  deleteOne(id: string) {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  emailExistsActiveUser(id: string) {
    return this.userModel.findOne({ _id: id }).exec();
  }
}
