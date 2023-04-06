import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common" 
import { UserService } from "@app/user/user.service"
import { CreateUserDto } from "@app/user/dtos/createUser.dto"
import { UserResponseInterface } from "@app/user/types/userResponse.interface"
import { LoginUserDto } from "./dtos/loginUser.dto"
import { UserEntity } from "./user.entity"
import { ExpressRequest } from "@app/types/expressRequest.interface"
import { User } from "./decorators/user.decorator"

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){

    }
    @Post()
    @UsePipes(new ValidationPipe)
    async createUser (@Body('user') createUserDto : CreateUserDto ): Promise<UserResponseInterface>{
        const user = await this.userService.createUser(createUserDto)
        return this.userService.buildUserResponse(user)
    } 

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(
        @Body('user') 
        loginDto: LoginUserDto
    ): Promise<UserResponseInterface>{
        const user =await this.userService.login(loginDto)
        return this.userService.buildUserResponse(user)
    }

    @Get('me')
    async curentUser(
        @Req()
        request: ExpressRequest,
        @User() user:any
    ): Promise<UserResponseInterface>{
        console.log('decoUser',user)
        return this.userService.buildUserResponse(request.user)
    }
} 