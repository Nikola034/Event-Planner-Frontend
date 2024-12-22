import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NotificationDTO } from './notification-dto';
import { API_URL } from '../../../globals';
import { JwtService } from '../auth/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
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
}
