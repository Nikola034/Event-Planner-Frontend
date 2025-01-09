import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ProductFilters } from './model/product-filters';
import { PageResponse } from '../../shared/page/page-response';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../globals';
import { GetAllByCaterogiesDTO, MerchandiseOverviewDTO } from '../merchandise/model/merchandise-overview-dto';
import { Product } from './model/product';
import { environment } from '../../../environments/environment';
import { ProductOverviewDTO } from '../merchandise/model/product-overview.dto';
import { CreateProductRequestDTO } from './create-product/dto/create-product.dto';
import { UpdateProductRequestDTO } from './create-product/dto/create-product.dto';
import { JwtService } from '../../infrastructure/auth/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient,private jwtService:JwtService){}

    getAll(): Observable<MerchandiseOverviewDTO[]> {
        return this.http
          .get<MerchandiseOverviewDTO[]>(`${environment.apiUrl}products`)
      }
      getAllByCategories(dto: GetAllByCaterogiesDTO): Observable<MerchandiseOverviewDTO[]> {
        return this.http
          .post<MerchandiseOverviewDTO[]>(`${environment.apiUrl}products/get-by-categories`, dto)
      }
      getById(id: number): Observable<ProductOverviewDTO> {
        return this.http
          .get<ProductOverviewDTO>(`${environment.apiUrl}products/${id}`)
      }
      create(dto: CreateProductRequestDTO): Observable<ProductOverviewDTO> {
        return this.http
          .post<ProductOverviewDTO>(`${environment.apiUrl}products`, dto)
      }
      update(id: number, dto: UpdateProductRequestDTO): Observable<ProductOverviewDTO> {
        return this.http
          .put<ProductOverviewDTO>(`${environment.apiUrl}products/${id}`, dto)
      }
      showProduct(id: number): Observable<boolean> {
        return this.http
          .put<boolean>(`${environment.apiUrl}products/show/${id}`, {})
      }
      availProduct(id: number): Observable<boolean> {
        return this.http
          .put<boolean>(`${environment.apiUrl}products/avail/${id}`, {})
      }
      delete(id: number): Observable<boolean> {
        return this.http
          .delete<boolean>(`${environment.apiUrl}products/${id}`)
      }

    getAllBySp(id: number): Observable<ProductOverviewDTO[]> {
        return this.http
          .get<ProductOverviewDTO[]>(`${environment.apiUrl}products/sp/${id}`)
      }

    search(filters: ProductFilters | null = null, search: string = '',sort:string='price'): Observable<MerchandiseOverviewDTO[]> {
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
        return this.http.get<PageResponse>(`${API_URL}/api/v1/products/search`, { params }).pipe(
            map((page: PageResponse) => page.content as MerchandiseOverviewDTO[])
        );
    }

    buyProduct(productId: number, eventId: number): Observable<any> {
        return this.http.post(`${API_URL}/api/v1/products/buy/${productId}`, eventId);
    }
}
