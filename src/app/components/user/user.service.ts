import { Injectable } from '@angular/core';
import { API_URL } from '../../../globals';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserOverviewDTO } from './user-overview-dto';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  followEvent(userId: number, eventId: number) {
    const params = new HttpParams().set('userId', userId).set("eventId", eventId);

    return this.httpClient.post<any>(`${API_URL}/api/v1/users/follow-event`, null, { params: params });
  }
  getServiceProvidersForOrganizerEvents(organizerId: number,role:string): Observable<UserOverviewDTO[]> {
    if (organizerId === -1) return of([]);
    if(role==='EO')
    return this.httpClient.get<UserOverviewDTO[]>(`${API_URL}/api/v1/users/eo/${organizerId}/chat-users`);
  else if(role==='SP')
    return this.httpClient.get<UserOverviewDTO[]>(`${API_URL}/api/v1/users/sp/${organizerId}/chat-users`);
  else
  return this.httpClient.get<UserOverviewDTO[]>(`${API_URL}/api/v1/users/au/chat-users`);
  }

}
