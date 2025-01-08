import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { NotificationDTO } from './notification-dto';
import { API_URL } from '../../../globals';
import { JwtService } from '../../infrastructure/auth/jwt.service';
import { MessageDTO } from '../../shared/messaging/model/message-dto';
import { Stomp } from '@stomp/stompjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private stompClient: any;
  private currentSubscription: any;
  private notificationSubject = new Subject<NotificationDTO>();
  private connectionStatus = new BehaviorSubject<boolean>(false);
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;
  private readonly RECONNECT_INTERVAL = 3000;
  private baseUrl = `${API_URL}/api/v1/notifications`;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      // Only initialize WebSocket in browser environment
      if (this.jwtService.getIdFromToken() !== -1) {
        this.InitializeWebSocket();
      }

      window.addEventListener('focus', () => {
        if (!this.isConnected()) {
          this.reconnect();
        }
      });
    }
  }

  private isConnected(): boolean {
    return this.stompClient?.connected || false;
  }

  public InitializeWebSocket() {
    if (!this.isBrowser) return;

    try {
      const socket = new WebSocket('ws://localhost:8080/ws');
      this.stompClient = Stomp.over(socket);
      this.stompClient.reconnect_delay = this.RECONNECT_INTERVAL;

      // Configure heartbeat
      this.stompClient.heartbeat.outgoing = 20000;
      this.stompClient.heartbeat.incoming = 20000;

      this.connectToNotificationsWebSocket();
    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
      this.attemptReconnect();
    }
  }

  public connectToNotificationsWebSocket() {
    if (!this.isBrowser) return;

    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }

    const connectCallback = () => {
      const userId = this.jwtService.getIdFromToken();
      if (userId === -1) return;

      this.currentSubscription = this.stompClient.subscribe(
        `/user/${userId}/notifications`,
        (notification: any) => {
          if (notification.body) {
            const notificationData = JSON.parse(notification.body);
            this.notificationSubject.next(notificationData);
          }
        }
      );

      this.connectionStatus.next(true);
      this.reconnectAttempts = 0;
      //console.log('Successfully connected to notifications WebSocket');
    };

    const errorCallback = (error: any) => {
      console.error("WebSocket connection error:", error);
      this.connectionStatus.next(false);
      this.attemptReconnect();
    };

    if (this.stompClient) {
      this.stompClient.connect({}, connectCallback, errorCallback);
    }
  }

  private attemptReconnect(): void {
    if (!this.isBrowser) return;

    if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
      console.error('Max reconnection attempts reached');
      return;
    }

    setTimeout(() => {
      if (!this.isConnected() && this.jwtService.getIdFromToken() !== -1) {
        this.reconnectAttempts++;
        //console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.MAX_RECONNECT_ATTEMPTS})`);
        this.InitializeWebSocket();
      }
    }, this.RECONNECT_INTERVAL);
  }

  private reconnect(): void {
    if (!this.isBrowser) return;

    if (!this.isConnected() && this.jwtService.getIdFromToken() !== -1) {
      this.reconnectAttempts = 0;
      this.InitializeWebSocket();
    }
  }

  public disconnect(): void {
    if (!this.isBrowser) return;

    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
    this.connectionStatus.next(false);
  }

  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }

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
