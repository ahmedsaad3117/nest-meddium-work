import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileType } from './types/profile.type';
import { UserEntity } from '@app/user/user.entity';
import { Repository } from 'typeorm';
import { ProfileResponseInterface } from './types/profileResponse.interface';
import { FollowEntity } from './follow.entity';

@Injectable({})
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}
  async getProfile(
    curentUserId: number,
    profileUsername: string,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      username: profileUsername,
    });

    if (!user) {
      throw new HttpException('Profile odes not exist', HttpStatus.NOT_FOUND);
    }

    const follow = await this.followRepository.findOne({
      followerId: curentUserId,
      followingId: user.id
    })

    return { ...user, following: Boolean(follow) };
  }

  async followProfile(
    currentUserId: number,
    profileUsername: string,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      username: profileUsername,
    });

    if (!user) {
      throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
    }

    if (currentUserId === user.id) {
      throw new HttpException(
        "You can't follow yourself",
        HttpStatus.BAD_REQUEST,
      );
    }

    const follow = await this.followRepository.findOne({
      followerId: currentUserId,
      followingId: user.id,
    });

    if (!follow) {
      const followToCreate = new FollowEntity();
      followToCreate.followerId = currentUserId;
      followToCreate.followingId = user.id;
      await this.followRepository.save(followToCreate);
    }

    return { ...user, following: true };
  }

  async deleteFollowProfile (currentUserId :number , profileUsername: string): Promise<ProfileType>{
    const user = await this.userRepository.findOne({username: profileUsername})
    
    await this.followRepository.delete({
      followerId: currentUserId,
      followingId: user.id,
    })

    return { ...user, following: false };


    if(!user){
      throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
    }

    

  } 

  buildProfileResponse(profile: ProfileType): ProfileResponseInterface {
    delete profile.email;
    return { profile };
  }
}
