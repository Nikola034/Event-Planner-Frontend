import { Component } from '@angular/core';
import { NotificationService } from './notification.service';
import { NotificationDTO, NotificationType } from './notification-dto';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { JwtService } from '../auth/jwt.service';
import { Router } from '@angular/router';

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

  constructor(private notificationService: NotificationService, private jwtService: JwtService, private router:Router) { }

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

  openNotification(notification: NotificationDTO){
    if(notification.type==NotificationType.EVENT){
      this.router.navigate(['home','event-details', notification.entityId]);
    }
    else if(notification.type==NotificationType.PRODUCT){
      this.router.navigate(['home','product', notification.entityId,-1]);
    }
    else if(notification.type==NotificationType.SERVICE){
      this.router.navigate(['home','service',notification.entityId]);
    }
    this.markAsRead(notification);
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
