import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Stomp } from '@stomp/stompjs';
import { isPlatformBrowser } from '@angular/common';
import { API_URL } from '../globals';
import { JwtService } from './components/auth/jwt.service';
import { Router } from '@angular/router';
import { NotificationService } from './components/sidebar-notifications/notification.service';

export interface SuspensionDTO {
  id: number;
  userId: number;
  reason: string;
  startTime: string;
  endTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class SuspensionService {
  private stompClient: any;
  private currentSubscription: any;
  private suspensionSubject = new Subject<SuspensionDTO>();
  private connectionStatus = new BehaviorSubject<boolean>(false);
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;
  private readonly RECONNECT_INTERVAL = 3000;
  private isBrowser: boolean;

  constructor(
    private jwtService: JwtService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    private notificationService:NotificationService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser) {
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
      
      this.stompClient.heartbeat.outgoing = 20000;
      this.stompClient.heartbeat.incoming = 20000;

      this.connectToSuspensionsWebSocket();
    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
      this.attemptReconnect();
    }
  }

  public connectToSuspensionsWebSocket() {
    if (!this.isBrowser) return;
    
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }

    const connectCallback = () => {
      const userId = this.jwtService.getIdFromToken();
      if (userId === -1) return;

      this.currentSubscription = this.stompClient.subscribe(
        `/user/${userId}/suspensions`,
        (suspension: any) => {
          if (suspension.body) {
            const suspensionData: SuspensionDTO = JSON.parse(suspension.body);
            this.suspensionSubject.next(suspensionData);
            this.handleSuspension(suspensionData);
          }
        }
      );
      
      this.connectionStatus.next(true);
      this.reconnectAttempts = 0;
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

  private handleSuspension(suspension: SuspensionDTO): void {
    if (this.isBrowser) {
      this.jwtService.Logout();
      this.notificationService.disconnect();
      this.disconnect();
      this.router.navigate([''], {
        state: { suspension }
      });
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

  onSuspensionReceived(): Observable<SuspensionDTO> {
    return this.suspensionSubject.asObservable();
  }
}