import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { MessageDTO } from './components/messaging-page/message-dto';
import { MessageRequestDTO } from './components/messaging-page/message-request-dto';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: any;
  private messageSubject = new Subject<MessageDTO>();

  constructor() { 
    const socket = new WebSocket('ws://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    this.connectToWebSocket();
  }

  private connectToWebSocket() {
    this.stompClient.connect({}, () => {
      this.subscribeToMessages();
      // this.subscribeToNotifications();
      // this.subscribeToBlockEvents(); 
    });
  }

  private subscribeToMessages() {
    this.stompClient.subscribe('/user/message', (message: any) => {
      if(message.body) {
        const msg: MessageDTO = JSON.parse(message.body);
        this.messageSubject.next(msg);
      }
    });
  }

  sendMessage(message: MessageRequestDTO) {
    this.stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
  }

  onMessageReceived(): Observable<MessageDTO> {
    return this.messageSubject.asObservable();
  }
  
}
