import { Injectable } from '@angular/core';
import { Merchandise } from './merchandise';
import { forkJoin, map, mergeAll, Observable, of } from 'rxjs';
import { ServiceService } from '../service/service.service';
import { ProductService } from '../product/product.service';
import { HttpClient } from '@angular/common/http';
import { MerchandiseOverviewDTO } from './merchandise-overview-dto';
import { API_URL } from '../../../globals';
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
  getAll(): Observable<Merchandise[]> {
    return forkJoin([
      this.serviceService.getAll(),
      this.productService.getAll()
    ]).pipe(
      map(([services, products]) => [...services, ...products])
    );
  }

  getType(merchandise: Merchandise): string {
    return 'availableTimeslots' in merchandise ? 'Service' : 'Product';
  }

  getRating(merchandise: Merchandise): number {
    if (!merchandise.reviews || merchandise.reviews.length === 0) {
      return 0;
    }

    const totalRating = merchandise.reviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((totalRating / merchandise.reviews.length).toFixed(1));
  }

  getTop(): Observable<MerchandiseOverviewDTO[]> {
    return this.http.get<MerchandiseOverviewDTO[]>(`${API_URL}/api/v1/merchandise/top`)
  }


  constructor(private serviceService: ServiceService, private productService: ProductService,private http: HttpClient) { }
}
