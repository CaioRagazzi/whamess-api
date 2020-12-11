/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, UseGuards, Get, Delete, Param, Post, Body, Patch, ValidationPipe, Query } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/passport/guards/jwt-auth.guard";
import { UsersService } from "../services/users.service";
import { UsersDTO, UpdateUsersDTO, MessagesInfoDTO } from "../DTOs/users.dto";
import { getRepository } from "typeorm";
import { Users } from "../entities/users.entity";

@Controller()
export default class UserController {
    constructor(private userServices: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get('users/get-all')
    getAllUsers() {
        const allUsers = this.userServices.findAll();
        return allUsers;
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete('users/:id')
    deleteUser(@Param() params) {
        this.userServices.remove(params.id)
    }

    @Post('users/')
    createUser(@Body() data: UsersDTO){
        return this.userServices.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('users/getbyemail/:email')
    async getByEmail(@Param() param) {
    return await this.userServices.getByEmail(param.email);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('users/')
    async updateUser(@Body(ValidationPipe) data: UsersDTO, @Query() param) {
    return await this.userServices.updateUser(data, param.id);
    }    

    @UseGuards(JwtAuthGuard)
    @Post('users/messagescount/:id/:rows')
    async messagescount(@Param() param) {
        return await this.userServices.messagescount(param.id, param.rows);
    }

    //@UseGuards(JwtAuthGuard)
    @Post('users/messagesinfo/')
    async messagesinfo(@Body() data: MessagesInfoDTO) {
        return await this.userServices.messagesInfo(data);
    }

    //@UseGuards(JwtAuthGuard)
    @Get('users/messagesperday/')
    async messagesPerDay(@Query() param) {
    return await this.userServices.messagesPerDay(param.id);
    }    

    //@UseGuards(JwtAuthGuard)
    @Get('users/messagesperweek/')
    async messagesPerWeek(@Query() param) {
    return await this.userServices.messagesPerWeek(param.id);
    }    
    
    //@UseGuards(JwtAuthGuard)
    @Get('users/messagespermonth/')
    async messagesPerMonth(@Query() param) {
    return await this.userServices.messagesPerMonth(param.id);
    }        
}