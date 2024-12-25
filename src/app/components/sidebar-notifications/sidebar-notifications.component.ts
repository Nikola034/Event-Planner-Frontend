import { Component } from '@angular/core';
import { NotificationService } from './notification.service';
import { NotificationDTO } from './notification-dto';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { JwtService } from '../auth/jwt.service';

@Component({
  selector: 'app-sidebar-notifications',
  standalone: true,
  imports: [TabViewModule, CardModule, CommonModule, ButtonModule],
  templateUrl: './sidebar-notifications.component.html',
  styleUrl: './sidebar-notifications.component.scss'
})
export class SidebarNotificationsComponent {
  activeTab: number = 0;
  unreadNotifications: NotificationDTO[] = [];
  readNotifications: NotificationDTO[] = [];

  constructor(private notificationService: NotificationService, private jwtService: JwtService) { }

  ngOnInit() {
    this.loadNotifications();
    if (this.jwtService.getIdFromToken() != -1) {
      this.notificationService.onNotificationReceived().subscribe(notification => {
        this.unreadNotifications.push(notification);
      });
    }
  }

  loadNotifications() {
    this.notificationService.getUnreadNotifications()
      .subscribe(notifications => {
        this.unreadNotifications = notifications;
      });

    this.notificationService.getReadNotifications()
      .subscribe(notifications => {
        this.readNotifications = notifications;
      });
  }

  markAsRead(notification: NotificationDTO) {
    if (notification.id) {
      this.notificationService.markAsRead(notification.id)
        .subscribe(() => {
          this.unreadNotifications = this.unreadNotifications
            .filter(n => n.id !== notification.id);
          notification.read = true;
          this.readNotifications.push(notification);
        });
    }
  }

}
