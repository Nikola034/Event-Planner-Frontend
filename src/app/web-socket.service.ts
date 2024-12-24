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
  private currentSubscription: any;
  private messageSubject = new Subject<MessageDTO>();

  constructor() { }

  public InitializeWebSocket() {
    const socket = new WebSocket('ws://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
  }

  public connectToMessagesWebSocket(senderId: number, receiverId: number) {
    if(this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }
    
    this.stompClient.connect({}, () => {
      const conversationId = this.generateConversationId(senderId, receiverId);
      this.stompClient.subscribe(`/user/${senderId}/private/messages/${conversationId}`, (message: any) => {
        if(message.body) {
          const msg: MessageDTO = JSON.parse(message.body);
          this.messageSubject.next(msg);
        }
      });
    }, (error: any) => {
      console.error("WS not connected " + error);
    });
  }

  private generateConversationId(senderId: number, receiverId: number) {
    return senderId < receiverId ? `${senderId}-${receiverId}` : `${receiverId}-${senderId}`;
  }

  sendMessage(message: MessageRequestDTO) {
    this.stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
  }

  onMessageReceived(): Observable<MessageDTO> {
    return this.messageSubject.asObservable();
  }
  
}
