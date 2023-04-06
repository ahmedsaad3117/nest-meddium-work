import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "@app/user/dtos/createUser.dto";
import { UserEntity } from "@app/user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { sign } from "jsonwebtoken"
import { JWT_SECERT } from "@app/config";
import { UserResponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "./dtos/loginUser.dto";
import { compare} from 'bcrypt'

@Injectable({})
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
    ) {

    }
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userByEmail = await this.userRepository.findOne({
            email: createUserDto.email
        })
        const userByUsername = await this.userRepository.findOne({
            username: createUserDto.username
        })

        if (userByEmail || userByUsername) {
            throw new HttpException('Email or username are taken', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const newUser = new UserEntity()
        Object.assign(newUser, createUserDto)
        console.log(newUser)
        return await this.userRepository.save(newUser)
    }

    generateJWT(user: UserEntity): string {
        return sign({
            id: user.id,
            username: user.username,
            email: user.email,
        }, JWT_SECERT)
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJWT(user)
            }
        }
    }

    async login (loginUserDto: LoginUserDto): Promise<UserEntity>{
        const user = await this.userRepository.findOne({email: loginUserDto.email},{select: ['id','username','email','bio','image','password']})
        
        if(!user){
            throw new HttpException('Credentials are not vaild',HttpStatus.UNPROCESSABLE_ENTITY)
        }
        
        const isPasswordCorrect = await compare(loginUserDto.password,user.password)
         
        if(!isPasswordCorrect){
            throw new HttpException('Credentials are not vaild',HttpStatus.UNPROCESSABLE_ENTITY)
        }

        delete user.password        
        return user
    }

    async findById (id: number): Promise<UserEntity>{
        return this.userRepository.findOne(id)

    }
} 