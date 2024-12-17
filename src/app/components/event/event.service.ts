import { Injectable } from '@angular/core';
import { Event } from './event';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EventOverviewDTO } from './event-overview-dto';
import { API_URL } from '../../../globals';
import { PageResponse } from '../page/page-response';
import { EventFilters } from './event-filters';
import { JwtService } from '../auth/jwt.service';
import { environment } from '../../../environments/environment';
import { CreateEventDTO } from '../my-events/dtos/CreateEvent.dto';
import { CreateEventResponseDTO } from '../my-events/dtos/CreateEventResponse.dto';
import { UpdateEventDTO } from '../my-events/dtos/UpdateEvent.dto';
import { InviteResponseDTO } from './invite-response';
import { ActivityOverviewDTO, CreateActivityDTO } from '../agenda/activity-overview.dto';
import { EventDetailsDTO } from './EventDetailsDTO';
import { EventReportDTO } from './event-report.dto';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  public SortOptions: string[] = [
    'title',
    'description',
    'maxParticipants',
    'isPublic',
    'date',
    'type',
  ];

  private events: Event[] = [];
  constructor(private http: HttpClient, private jwtService: JwtService) {}

  getByEo(id: number | null): Observable<EventOverviewDTO[]> {
    if(id===-1)return of([]);
    return this.http
      .get<PageResponse>(`${environment.apiUrl}events/eo/${id}`)
      .pipe(map((page: PageResponse) => page.content as EventOverviewDTO[]));
  }

  getById(id: number | null): Observable<CreateEventResponseDTO> {
    return this.http.get<CreateEventResponseDTO>(`${environment.apiUrl}events/${id}`)
  }
  getEventDetails(id: number | null): Observable<EventDetailsDTO> {
    let userId=this.jwtService.getIdFromToken();
    return this.http.get<EventDetailsDTO>(`${environment.apiUrl}events/${id}/details?userId=${userId}`)
  }
  favorizeEvent(eventId: number | null, userId: number | null): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}events/${eventId}/add-to-favorites/${userId}`, {})
  }
  getReport(eventId: number | null | undefined): Observable<EventReportDTO>{
    return this.http.get<EventReportDTO>(`${environment.apiUrl}events/report/${eventId}`)
  }
  getFavorites(): Observable<EventOverviewDTO[]>{
    let userId=this.jwtService.getIdFromToken();
    return this.http.get<EventOverviewDTO[]>(`${environment.apiUrl}events/${userId}/favorite`);
  }
  getTop(): Observable<EventOverviewDTO[]> {
    const params={
      userId:this.jwtService.getIdFromToken()
  };
    return this.http
      .get<PageResponse>(`${API_URL}/api/v1/events/top`,{params})
      .pipe(map((page: PageResponse) => page.content as EventOverviewDTO[]));
  }
  
  getAgenda(eventId: number): Observable<ActivityOverviewDTO[]> {
    return this.http.get<ActivityOverviewDTO[]>(`${environment.apiUrl}events/${eventId}/agenda`)

  }
  addActivity(eventId: number, dto: CreateActivityDTO): Observable<ActivityOverviewDTO> {
    return this.http.put<ActivityOverviewDTO>(`${environment.apiUrl}events/${eventId}/agenda`, dto)

  }
  updateActivity(acitivtyId:number | null | undefined, dto: CreateActivityDTO): Observable<ActivityOverviewDTO> {
    return this.http.put<ActivityOverviewDTO>(`${environment.apiUrl}events/agenda/${acitivtyId}`, dto)

  }
  deleteActivity(eventId: number, acitivtyId:number): Observable<ActivityOverviewDTO> {
    return this.http.delete<ActivityOverviewDTO>(`${environment.apiUrl}events/${eventId}/agenda/${acitivtyId}`)

  }


  create(dto: CreateEventDTO): Observable<CreateEventResponseDTO> {
    return this.http.post<CreateEventResponseDTO>(
      `${environment.apiUrl}events`,
      dto
    );
  }
  update(
    id: number | null | undefined,
    dto: UpdateEventDTO
  ): Observable<CreateEventResponseDTO> {
    return this.http.put<CreateEventResponseDTO>(
      `${environment.apiUrl}events/${id}`,
      dto
    );
  }

  getFollowed(): Observable<EventOverviewDTO[]> {
    let userId=this.jwtService.getIdFromToken();
    const params={
        userId:userId
    };
    return this.http.get<EventOverviewDTO[]>(`${API_URL}/api/v1/events/followed`,{params});
}


  private formatDate = (date: Date | null | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-CA'); // 'en-CA' gives YYYY-MM-DD format
  };

    search(
      filters: EventFilters|null=null, search: string='',sort:string='date') {
          if(!filters?.isActive) return of([]);
          
          const params = {
            userId:this.jwtService.getIdFromToken(),
              startDate: this.formatDate(filters?.startDate),
              endDate: this.formatDate(filters?.endDate),
              type: filters?.type || '',
              city: filters?.city || '',
              search: search,
              sort:sort
          };
          
          
          return this.http.get<PageResponse>(`${API_URL}/api/v1/events/search`, { params }).pipe(
              map((page: PageResponse) => page.content as EventOverviewDTO[])
          );

  }

  inviteToEvent(email: string, eventId: number) {
      const params = new HttpParams()
        .set('email', email)
        .set('eventId', eventId.toString());
    
      return this.http.post<InviteResponseDTO>(`${API_URL}/api/v1/events/invite`, {}, { params });
    }
}
