import { Injectable } from '@angular/core';
import { Merchandise } from './model/merchandise';
import { forkJoin, map, mergeAll, Observable, of } from 'rxjs';
import { ServiceService } from '../service/service.service';
import { ProductService } from '../product/product.service';
import { HttpClient } from '@angular/common/http';
import { MerchandiseOverviewDTO } from './model/merchandise-overview-dto';
import { API_URL } from '../../../globals';
import { PageResponse } from '../../shared/page/page-response';
import { ServiceFilters } from '../service/model/service-filters';
import { ProductFilters } from '../product/model/product-filters';
import { MerchandiseDetailDTO } from './model/merchandise-detail-dto';
import { JwtService } from '../../infrastructure/auth/jwt.service';
import { environment } from '../../../environments/environment';
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
    'rating'
  ];



  getTop(): Observable<MerchandiseOverviewDTO[]> {
    let userId=this.jwtService.getIdFromToken();
    const params={
        userId:userId
    };
    return this.http.get<MerchandiseOverviewDTO[]>(`${API_URL}/api/v1/merchandise/top`,{params});
  }
  favorizeMerchandise(merchandiseId: number | null | undefined, userId: number | null | undefined): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}merchandise/${merchandiseId}/add-to-favorites/${userId}`, {})
  }

  search(
    serviceFilters: ServiceFilters | null = null,
    productFilters: ProductFilters | null = null,
    search: string = '',
    sort: string = 'price',
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<MerchandiseOverviewDTO[]> {
    return forkJoin([
      this.serviceService.search(serviceFilters, search),
      this.productService.search(productFilters, search)
    ]).pipe(
      map(([services, products]) => {
        const combined = [...services, ...products];
        return combined.sort((a, b) => {
          const aValue = a[sort as keyof MerchandiseOverviewDTO];
          const bValue = b[sort as keyof MerchandiseOverviewDTO];

          // Handle null/undefined values
          if (aValue === null || aValue === undefined) return 1;
          if (bValue === null || bValue === undefined) return -1;
          if (aValue === null && bValue === null) return 0;

          let comparison = 0;

          if (typeof aValue === 'number' && typeof bValue === 'number') {
            comparison = aValue - bValue;
          } else if (typeof aValue === 'string' && typeof bValue === 'string') {
            comparison = aValue.localeCompare(bValue);
          }
          return direction === 'asc' ? comparison : -comparison;
        });
      })
    );
  }

  getMerchandiseDetails(merchandiseId: number): Observable<MerchandiseDetailDTO> {
    let userId=this.jwtService.getIdFromToken();
    return this.http.get<MerchandiseDetailDTO>(`${API_URL}/api/v1/merchandise/${merchandiseId}?userId=${userId}`)
   }

  getFavorites(): Observable<MerchandiseOverviewDTO[]>{
      let userId=this.jwtService.getIdFromToken();
      return this.http.get<MerchandiseOverviewDTO[]>(`${API_URL}/api/v1/merchandise/${userId}/favorite`);
    }

  getMerchandiseByCategory(categoryId: number, maxAmount: number): Observable<MerchandiseOverviewDTO[]> {
    const params = {
      maxPrice: maxAmount
    }
    return this.http.get<MerchandiseOverviewDTO[]>(`${API_URL}/api/v1/merchandise/category/${categoryId}`, {params});
  }
  constructor(private serviceService: ServiceService, private productService: ProductService,private http: HttpClient,private jwtService:JwtService) { }
}
