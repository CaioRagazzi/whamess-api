import { Controller, Get, UseGuards, Delete } from '@nestjs/common';
import { SessionService } from "../services/session.service";
import { JwtAuthGuard } from 'src/auth/passport/guards/jwt-auth.guard';


@Controller('session')
export class SessionController {
    constructor(private SessionService: SessionService) { }
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        let islogged = await this.SessionService.getSession();
        this.SessionService.removeSession();
        return { islogged };
    }

    //@UseGuards(JwtAuthGuard)
    @Delete()
    removeSession() {
        try {
            return this.SessionService.removeSession();
        } catch { 
            return { 'message':'nao ok' }
        }
    }
}