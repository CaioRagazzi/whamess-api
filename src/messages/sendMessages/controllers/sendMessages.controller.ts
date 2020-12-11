import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { SendMessagesDTO } from '../DTOs/sendMessagesDTO';
import { SendMessagesService } from '../services/sendMessages.service';
import { JwtAuthGuard } from 'src/auth/passport/guards/jwt-auth.guard';
import { UsersService } from 'src/users/services/users.service'

@Controller()
export class SendMessagesController {
  constructor(private sendMessagesService: SendMessagesService) { }

  @UseGuards(JwtAuthGuard)
  @Post('messages/send')
  async sendMessages(@Body(ValidationPipe) sendMessagesDto: SendMessagesDTO): Promise<any> {
    const columns = sendMessagesDto.columnSheet.shift();

    for (let index = 0; index < sendMessagesDto.columnSheet.length; index++) {

      let formatedMessage = sendMessagesDto.message;
      columns.map((itemColumns, idx) => {
        if (sendMessagesDto.message.includes(`{${itemColumns}}`)) {
          formatedMessage = formatedMessage.replace(`{${itemColumns}}`, sendMessagesDto.columnSheet[index][idx])
        }
      })

      await this.sendMessagesService.execute(sendMessagesDto.columnSheet[index][0], formatedMessage)
    }

    this.sendMessagesService.removeSession();

    return sendMessagesDto.columnSheet.length ;
  }
}
