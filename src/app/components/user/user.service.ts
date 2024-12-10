import { Injectable } from '@angular/core';
import { API_URL } from '../../../globals';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  followEvent(userId:number,eventId:number){
    const params = new HttpParams().set('userId', userId).set("eventId",eventId);
    
    return this.httpClient.post<any>(`${API_URL}/api/v1/users/follow-event`,null,{ params:params });
}

}
