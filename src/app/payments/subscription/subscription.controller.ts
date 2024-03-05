import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { JwtAuthGuard } from 'src/app/auth/auth.guard';
import { CreateSubscriptionDto } from './dto/subscription.create.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) { }

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  async createSubscription(@Body() payload: CreateSubscriptionDto) {
    return await this.subscriptionService.createSignature(payload);
  }
}
