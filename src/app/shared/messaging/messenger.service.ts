import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageDTO } from './model/message-dto';
import { API_URL } from '../../../globals';


@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  private readonly apiUrl = `${API_URL}/api/v1/messages`; // Base URL for the message endpoints

  constructor(private http: HttpClient) { }

  /**
   * Fetch all messages between a sender and recipient, sorted from oldest to newest.
   *
   * @param senderId The ID of the sender.
   * @param recipientId The ID of the recipient.
   * @returns An Observable of the list of MessageDTO objects.
   */
  getMessagesBySenderAndRecipient(senderId: number, recipientId: number): Observable<MessageDTO[]> {
    if (senderId === -1) return of([]);
    const params = new HttpParams()
      .set('senderId', senderId)
      .set('recipientId', recipientId);

    return this.http.get<MessageDTO[]>(`${this.apiUrl}`, { params });
  }

  /**
   * Send a new message from a sender to a recipient.
   *
   * @param senderId The ID of the sender.
   * @param recipientId The ID of the recipient.
   * @param content The content of the message.
   * @returns An Observable of the created MessageDTO.
   */
  sendMessage(senderId: number, recipientId: number, content: string): Observable<MessageDTO> {
    const params = new HttpParams()
      .set('senderId', senderId)
      .set('recipientId', recipientId)
      .set('content', content);

    return this.http.post<MessageDTO>(`${this.apiUrl}`, null, { params });
  }
}
