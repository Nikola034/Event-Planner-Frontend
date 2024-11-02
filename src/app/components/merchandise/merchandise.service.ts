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

  getType(merchandise:Merchandise):string{
    return 'availableTimeslots' in merchandise?'Service':'Product';
  }

  constructor(private serviceService:ServiceService,private productService:ProductService) { }
}
