import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationDTO } from './notification-dto';
import { API_URL } from '../../../globals';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = `${API_URL}/api/v1/notifications`;

  constructor(private http: HttpClient) {}

  getUnreadNotifications(userId: number): Observable<NotificationDTO[]> {
      return this.http.get<NotificationDTO[]>(`${this.baseUrl}/unread/${userId}`);
  }

  getReadNotifications(userId: number): Observable<NotificationDTO[]> {
      return this.http.get<NotificationDTO[]>(`${this.baseUrl}/read/${userId}`);
  }

  markAsRead(notificationId: number): Observable<void> {
      return this.http.put<void>(`${this.baseUrl}/${notificationId}/read`, {});
  }
}
