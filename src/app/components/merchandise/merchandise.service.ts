import { Injectable } from '@angular/core';
import { Merchandise } from './merchandise';
import { forkJoin, map, mergeAll, Observable, of } from 'rxjs';
import { ServiceService } from '../service/service.service';
import { ProductService } from '../product/product.service';
import { HttpClient } from '@angular/common/http';
import { MerchandiseOverviewDTO } from './merchandise-overview-dto';
import { API_URL } from '../../../globals';
import { PageResponse } from '../page/page-response';
@Injectable({
  providedIn: 'root'
})
export class MerchandiseService {
  public SortOptions: string[] = [
    'title',
    'description',
    'specificity',
    'price',
    'discount',
    'duration',
    'rating'
  ];
  getAll(): Observable<MerchandiseOverviewDTO[]> {
    return this.http.get<PageResponse>(`${API_URL}/api/v1/merchandise/all`).pipe(
      map((page: PageResponse) => page.content as MerchandiseOverviewDTO[])
    );
  }


  getTop(): Observable<MerchandiseOverviewDTO[]> {
    return this.http.get<MerchandiseOverviewDTO[]>(`${API_URL}/api/v1/merchandise/top`);
  }


  constructor(private serviceService: ServiceService, private productService: ProductService,private http: HttpClient) { }
}
