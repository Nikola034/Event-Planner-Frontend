import { Injectable } from '@angular/core';
import { Service } from './model/service';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServiceFilters } from './model/service-filters';
import { PageResponse } from '../../shared/page/page-response';
import { GetAllByCaterogiesDTO, MerchandiseOverviewDTO } from '../merchandise/model/merchandise-overview-dto';
import { API_URL } from '../../../globals';
import { ReservationRequest } from './model/reservation-request';
import { ReservationResponse } from './model/reservation-response';
import { CreateRequest } from './model/create-request';
import { CreateServiceResponse } from './model/create-response';
import { UpdateRequest } from './model/update-request';
import { environment } from '../../../environments/environment';
import { TimeslotDTO } from '../../event/my-events/dtos/CreateEventResponse.dto';
import { JwtService } from '../../infrastructure/auth/jwt.service';
import { CalendarTimeSlotDTO } from './model/calendar-timeslot.dto';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private services: Service[] = [];
  getAll(): Observable<MerchandiseOverviewDTO[]> {
    return this.http
      .get<MerchandiseOverviewDTO[]>(`${environment.apiUrl}services`)
  }
  getAllByCategories(dto: GetAllByCaterogiesDTO): Observable<MerchandiseOverviewDTO[]> {
    return this.http
      .post<MerchandiseOverviewDTO[]>(`${environment.apiUrl}services/get-by-categories`, dto)
  }
  getById(id: number): Observable<Service | undefined> {
    const event = this.services.find(e => e.id === id);
    return of(event);
  }
  constructor(private http: HttpClient,private jwtService:JwtService) { }
  search(filters: ServiceFilters | null = null, search: string = '',sort:string='price'): Observable<MerchandiseOverviewDTO[]> {
    if(!filters?.isActive) return of([]);
    const params = {
      userId:this.jwtService.getIdFromToken(),
      priceMin: filters?.priceMin || '',
      priceMax: filters?.priceMax || '',
      category: filters?.category || '',
      durationMin: filters?.durationMin || '',
      durationMax: filters?.durationMax || '',
      city: filters?.city || '',
      search: search || '',
      sort:sort
    };

    // Send the GET request to your product search API with the constructed params
    return this.http.get<PageResponse>(`${API_URL}/api/v1/services/search`, { params }).pipe(
      map((page: PageResponse) => page.content as MerchandiseOverviewDTO[])
    );
  }

  reserve(serviceId: number, reservationRequest: ReservationRequest): Observable<any> {
    return this.http.post(`${API_URL}/api/v1/services/${serviceId}/reserve`, reservationRequest);
  }

  getServiceTimeslots(serviceId: number): Observable<TimeslotDTO[]> {
    return this.http.get<TimeslotDTO[]>(`${API_URL}/api/v1/services/${serviceId}/timeslots`);
  }

  create(createRequest: CreateRequest): Observable<CreateServiceResponse> {
    return this.http.post<CreateServiceResponse>(`${API_URL}/api/v1/services/create`, createRequest);
  }

  getAllBySpId(serviceProviderId: number): Observable<CreateServiceResponse[]> {
    return this.http.get<CreateServiceResponse[]>(`${API_URL}/api/v1/services/sp/${serviceProviderId}`);
  }
  getCalendarTimeslots(serviceProviderId: number): Observable<CalendarTimeSlotDTO[]> {
    return this.http.get<CalendarTimeSlotDTO[]>(`${environment.apiUrl}services/timeslots/${serviceProviderId}`);
  }

  update(serviceId: number, updateRequest: UpdateRequest): Observable<CreateServiceResponse> {
    return this.http.put<CreateServiceResponse>(`${API_URL}/api/v1/services/update/${serviceId}`, updateRequest);
  }

  delete(serviceId: number) {
    return this.http.put(`${API_URL}/api/v1/services/delete/${serviceId}`,null);
  }
}
