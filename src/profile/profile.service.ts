import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileType } from './types/profile.type';
import { UserEntity } from '@app/user/user.entity';
import { Repository } from 'typeorm';
import { ProfileResponseInterface } from './types/profileResponse.interface';

@Injectable({})
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async getProfile(
    curentUserId: number,
    profileUsername: string,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
        username: profileUsername
    })

    if(!user){
        throw new HttpException('Profile odes not exist', HttpStatus.NOT_FOUND)
    }

    return { ...user , following: false }
  }

  buildProfileResponse(profile: ProfileType): ProfileResponseInterface{
    return {profile}
  }
}
