import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { CreateEventTypeDTO, GetAllEventTypesDto } from './dtos/create-event-type.dto';
import { CreateEventTypeResponseDTO } from './dtos/create-event-type-response.dto';
import { UpdateEventTypeDTO } from './dtos/update-event-type.dto';
import { PageResponse } from '../page/page-response';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<CreateEventTypeResponseDTO[]> {
    return this.httpClient.get<PageResponse>(`${environment.apiUrl}event-types/all`).pipe(
      map((page: PageResponse) => page.content as CreateEventTypeResponseDTO[])
  );
  }
  getAllWp(): Observable<CreateEventTypeResponseDTO[]> {
    return this.httpClient.get<CreateEventTypeResponseDTO[]>(`${environment.apiUrl}event-types/all-wp`);
  }
  getAllActiveWp(): Observable<CreateEventTypeResponseDTO[]> {
    return this.httpClient.get<CreateEventTypeResponseDTO[]>(`${environment.apiUrl}event-types/all-active-wp`);
  }
  getById(id: number | null): Observable<CreateEventTypeResponseDTO> {
    return this.httpClient.get<CreateEventTypeResponseDTO>(`${environment.apiUrl}event-types/${id}`);
  }
  create(dto: CreateEventTypeDTO): Observable<CreateEventTypeResponseDTO> {
    return this.httpClient.post<CreateEventTypeResponseDTO>(`${environment.apiUrl}event-types`, dto);
  }
  update(id: number | null, dto: UpdateEventTypeDTO): Observable<CreateEventTypeResponseDTO> {
    return this.httpClient.put<CreateEventTypeResponseDTO>(`${environment.apiUrl}event-types/${id}`, dto);
  }
  deactivate(id: number): Observable<CreateEventTypeResponseDTO> {
    return this.httpClient.put<CreateEventTypeResponseDTO>(`${environment.apiUrl}event-types/deactivate/${id}`, {});
  }
}
