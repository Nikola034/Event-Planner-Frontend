import { Injectable } from '@angular/core';
import { Merchandise } from './merchandise';
import { forkJoin, map, mergeAll, Observable, of } from 'rxjs';
import { ServiceService } from '../service/service.service';
import { ProductService } from '../product/product.service';
@Injectable({
  providedIn: 'root'
})
export class MerchandiseService {
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

  getTop(count: number = 5, city = 'Novi Sad'): Observable<Merchandise[]> {
    return this.getAll().pipe(
      map(merchandise =>
        merchandise
          .filter(merch => {
            return merch.address.city === city;
          })
          .sort((a, b) => this.getRating(b) - this.getRating(a))
          .slice(0, count)
      )
    );
  }


  constructor(private serviceService: ServiceService, private productService: ProductService) { }
}
