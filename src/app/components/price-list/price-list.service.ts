import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PriceListItemDTO } from './price-list-item-dto';
import { UpdatePriceListItemDTO } from './update-price-list-item-dto';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  constructor(private http: HttpClient) { }

  getPriceList(serviceProviderId: number) :Observable<any> {
    return this.http.get<PriceListItemDTO[]>(`${environment.apiUrl}priceList/${serviceProviderId}`);
  }

  updatePriceListItem(serviceProviderId: number, merchandiseId: number, updateRequest: UpdatePriceListItemDTO): Observable<any> {
    return this.http.put<PriceListItemDTO[]>(`${environment.apiUrl}priceList/update/${merchandiseId}/${serviceProviderId}`, updateRequest);
  }
}
