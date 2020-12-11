import { Controller, Get, UseGuards } from '@nestjs/common';
import { QRCodeService } from '../services/qrCode.service';
import { JwtAuthGuard } from 'src/auth/passport/guards/jwt-auth.guard';


@Controller('getqrcode')
export class QRCodeController {
  constructor(private QRCodeService: QRCodeService) { }
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<any> {
    let string = await this.QRCodeService.getqrcode();
    return { string };
  } 
}
