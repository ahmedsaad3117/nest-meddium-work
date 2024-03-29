import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ExpressRequest } from "@app/types/expressRequest.interface";
import { JWT_SECERT } from "@app/config";
import { UserService } from "@app/user/user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService){

    }
    async use(req: ExpressRequest, _ : Response, next: NextFunction) {
        if (!req.headers.authorization) {
            req.user = null
            next() 
            return
        }

        const token = req.headers.authorization.split(' ')[1]

        try {
            const decode = verify(token, JWT_SECERT)
            const user = await this.userService.findById(decode.id)
            req.user = user
            next()
        } catch (err) {
            req.user = null
            next;
        }

    }
}