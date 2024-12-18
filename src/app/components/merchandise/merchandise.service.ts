import { Injectable } from '@angular/core';
import { Merchandise } from './merchandise';
import { forkJoin, map, mergeAll, Observable, of } from 'rxjs';
import { ServiceService } from '../service/service.service';
import { ProductService } from '../product/product.service';
import { HttpClient } from '@angular/common/http';
import { MerchandiseOverviewDTO } from './merchandise-overview-dto';
import { API_URL } from '../../../globals';
import { PageResponse } from '../page/page-response';
import { ServiceFilters } from '../service/service-filters';
import { ProductFilters } from '../product/product-filters';
import { MerchandiseDetailDTO } from './merchandise-detail-dto';
import { JwtService } from '../auth/jwt.service';
@Injectable({
  providedIn: 'root'
})
export class MerchandiseService {
  public SortOptions: string[] = [
    'title',
    'description',
    'specificity',
    'price',
    'discount'
  ];



  getTop(): Observable<MerchandiseOverviewDTO[]> {
    let userId=this.jwtService.getIdFromToken();
    const params={
        userId:userId
    };
    return this.http.get<MerchandiseOverviewDTO[]>(`${API_URL}/api/v1/merchandise/top`,{params});
  }

  search(serviceFilters: ServiceFilters | null = null,productFilters: ProductFilters | null = null, search: string = '',sort:string='price'): Observable<MerchandiseOverviewDTO[]> {
    return forkJoin([
      this.serviceService.search(serviceFilters,search,sort),
      this.productService.search(productFilters,search,sort)
    ]).pipe(
      map(([services, products]) => [...services, ...products]));
  }

  getMerchandiseDetails(merchandiseId: number): Observable<MerchandiseDetailDTO> {
    let userId=this.jwtService.getIdFromToken();
    return this.http.get<MerchandiseDetailDTO>(`${API_URL}/api/v1/merchandise/${merchandiseId}?userId=${userId}`) 
   }

  getFavorites(): Observable<MerchandiseOverviewDTO[]>{
      let userId=this.jwtService.getIdFromToken();
      return this.http.get<MerchandiseOverviewDTO[]>(`${API_URL}/api/v1/merchandise/${userId}/favorite`);
    }
  constructor(private serviceService: ServiceService, private productService: ProductService,private http: HttpClient,private jwtService:JwtService) { }
}
