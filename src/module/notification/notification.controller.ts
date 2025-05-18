import { Controller, Get, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('reminders')
  async runReminders() {
    await this.notificationService.handleWateringNotifications();
    return { status: 'Reminders handled' };
  }

  @Get('/notification/:userId')
  async getLogs(@Param('userId') userId: number) {
    return this.notificationService.getNotifications(userId);
  }
}
