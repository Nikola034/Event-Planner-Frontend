import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { EventOverviewDTO } from '../event/event-overview-dto';
import { MerchandiseOverviewDTO } from '../merchandise/merchandise-overview-dto';
import { MerchandiseDetailDTO } from '../merchandise/merchandise-detail-dto';
import { EventDetailsDTO } from '../event/EventDetailsDTO';
import { AddressDTO } from '../auth/register-dtos/address.dto';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private eventAddressesSubject = new BehaviorSubject<AddressDTO[]>([]);
  private productAddressesSubject = new BehaviorSubject<AddressDTO[]>([]);
  private serviceAddressesSubject = new BehaviorSubject<AddressDTO[]>([]);

  eventAddresses$ = this.eventAddressesSubject.asObservable();
  productAddresses$ = this.productAddressesSubject.asObservable();
  serviceAddresses$ = this.serviceAddressesSubject.asObservable();

  constructor(private http: HttpClient) {}

  search(street: string): Observable<any> {
    return this.http.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${street}`
    );
  }

  updateEventAddresses(data: EventOverviewDTO[] | EventDetailsDTO): void {
    const eventAddresses: AddressDTO[] = [];

    if (Array.isArray(data)) {
      for (const item of data) {
        if ('address' in item && item.address) {
          eventAddresses.push(item.address);
        }
      }
    } else if ('address' in data && data.address) {
      eventAddresses.push(data.address);
    }

    this.eventAddressesSubject.next(eventAddresses);
  }

  updateMerchandiseAddresses(data: MerchandiseOverviewDTO[] | MerchandiseDetailDTO): void {
    const productAddresses: AddressDTO[] = [];
    const serviceAddresses: AddressDTO[] = [];
  
    if (Array.isArray(data)) {
      for (const item of data) {
        if ('address' in item && item.address) {
          if (this.isProduct(item)) {
            productAddresses.push(item.address);
          } else if (this.isService(item)) {
            serviceAddresses.push(item.address);
          }
        }
      }
    } else if ('address' in data && data.address) {
      if (this.isProduct(data)) {
        productAddresses.push(data.address);
      } else if (this.isService(data)) {
        serviceAddresses.push(data.address);
      }
    }
    this.productAddressesSubject.next(productAddresses);
    this.serviceAddressesSubject.next(serviceAddresses);
  }

  reverseSearch(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
  }

  private isProduct(data: any): boolean {
    return 'type' in data && 'category' in data && data['type'] === 'Product';
  }

  private isService(data: any): boolean {
    return 'type' in data && 'category' in data && data['type'] === 'Service';
  }
}
