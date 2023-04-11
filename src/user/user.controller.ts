import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common" 
import { UserService } from "@app/user/user.service"
import { CreateUserDto } from "@app/user/dtos/createUser.dto"
import { UserResponseInterface } from "@app/user/types/userResponse.interface"
import { LoginUserDto } from "./dtos/loginUser.dto"
import { UserEntity } from "./user.entity"
import { ExpressRequest } from "@app/types/expressRequest.interface"
import { User } from "./decorators/user.decorator"
import { AuthGuard } from "./guards/auth.gusrd"
import { UpdateUserDto } from "./dtos/updateUser.dto"
import { BackendValidationPipe } from "@app/shared/pipes/backendValidation.pipe"

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){

    }
    @Post()
    @UsePipes(new BackendValidationPipe)
    async createUser (@Body('user') createUserDto : CreateUserDto ): Promise<UserResponseInterface>{
        const user = await this.userService.createUser(createUserDto)
        return this.userService.buildUserResponse(user)
    } 

    @Post('login')
    @UsePipes(new BackendValidationPipe())
    async login(
        @Body('user') 
        loginDto: LoginUserDto
    ): Promise<UserResponseInterface>{
        const user =await this.userService.login(loginDto)
        return this.userService.buildUserResponse(user)
    }

    @Get('me')
    @UseGuards(AuthGuard)
    async curentUser(
        @User() user:any
    ): Promise<UserResponseInterface>{
        return this.userService.buildUserResponse(user)
    }

    @Put()
    @UseGuards(AuthGuard)
    async updateCurrentUser(@User('id') currentUserId:number, @Body('user') updateUserDto: UpdateUserDto):Promise<UserResponseInterface> {
        const user = await this.userService.updateUser(currentUserId, updateUserDto)
        return this.userService.buildUserResponse(user)
    }
} 