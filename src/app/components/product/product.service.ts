import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ProductFilters } from './product-filters';
import { PageResponse } from '../page/page-response';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../globals';
import { MerchandiseOverviewDTO } from '../merchandise/merchandise-overview-dto';
import { Product } from './product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient){}

    getAll(): Observable<MerchandiseOverviewDTO[]> {
        return this.http
          .get<MerchandiseOverviewDTO[]>(`${environment.apiUrl}products`)
      }

    search(filters: ProductFilters | null = null, search: string = '',sort:string='price'): Observable<MerchandiseOverviewDTO[]> {
        if(!filters?.isActive) return of([]);
        const params = {
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
        return this.http.get<PageResponse>(`${API_URL}/api/v1/products/search`, { params }).pipe(
            map((page: PageResponse) => page.content as MerchandiseOverviewDTO[]) 
        );
    }
    
    buyProduct(productId: number, eventId: number): Observable<any> {
        return this.http.post(`${API_URL}/api/v1/products/buy/${productId}`, eventId);
    }
}
