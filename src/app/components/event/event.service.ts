import { Injectable } from '@angular/core';
import { Event } from './event';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { EventOverviewDTO } from './event-overview-dto';
import { API_URL } from '../../../globals';
@Injectable({
    providedIn: 'root'
})
export class EventService {
    public SortOptions: string[] = ['id',
        'title',
        'description',
        'maxParticipants',
        'public',
        'city',
        'date',
        'type'];


    private events: Event[] = [];
    constructor(private http: HttpClient) { }

    getAll(): Observable<EventOverviewDTO[]> {
        return this.http.get<EventOverviewDTO[]>(`${API_URL}/api/v1/events/top`).pipe(
            map((page: any) => page.content)
          );
    }


    getById(id: number): Observable<Event | undefined> {
        const event = this.events.find(e => e.id === id);
        return of(event);
    }

    getTop(): Observable<EventOverviewDTO[]> {
        return this.http.get<EventOverviewDTO[]>(`${API_URL}/api/v1/events/top`).pipe(
            map((page: any) => page.content)
          );
    }


}
