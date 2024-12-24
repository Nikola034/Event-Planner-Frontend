import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { NotificationDTO } from './notification-dto';
import { API_URL } from '../../../globals';
import { JwtService } from '../auth/jwt.service';
import { MessageDTO } from '../messaging-page/message-dto';
import { Stomp } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private stompClient: any;
  private currentSubscription: any;
  private notificationSubject = new Subject<NotificationDTO>();

  public InitializeWebSocket() {
    const socket = new WebSocket('ws://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
  }

  public connectToNotificationsWebSocket() {
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/user/${this.jwtService.getIdFromToken()}/notifications`, (notification: any) => {
        if (notification.body) {
          const notificationData = JSON.parse(notification.body);
          this.notificationSubject.next(notificationData);
        }
      });
    }, (error: any) => {
      console.error("WS not connected " + error);
    });
  }


  private baseUrl = `${API_URL}/api/v1/notifications`;

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  getUnreadNotifications(): Observable<NotificationDTO[]> {
    const userId = this.jwtService.getIdFromToken();
    if (userId === -1) return of([]);
    return this.http.get<NotificationDTO[]>(`${this.baseUrl}/unread/${userId}`);
  }

  getReadNotifications(): Observable<NotificationDTO[]> {
    const userId = this.jwtService.getIdFromToken();
    if (userId === -1) return of([]);
    return this.http.get<NotificationDTO[]>(`${this.baseUrl}/read/${userId}`);
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${notificationId}/read`, {});
  }

  onNotificationReceived(): Observable<NotificationDTO> {
    return this.notificationSubject.asObservable();
  }
}
