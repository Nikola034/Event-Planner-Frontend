import { CurrencyPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { AddServiceFormComponent } from '../add-service-form/add-service-form.component';
import { EditServiceFormComponent } from '../edit-service-form/edit-service-form.component';
import { Product } from '../product/product';
import { MerchandiseOverviewDTO } from '../merchandise/merchandise-overview-dto';
import { ProductOverviewDTO } from '../merchandise/product-overview.dto';
import { ProductService } from '../product/product.service';
import { tap } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-products-crud',
  standalone: true,
  imports: [ButtonModule, DropdownModule, RouterModule, TableModule, CurrencyPipe, DialogModule, EditServiceFormComponent, AddServiceFormComponent, CommonModule],
  templateUrl: './products-crud.component.html',
  styleUrl: './products-crud.component.scss'
})
export class ProductsCrudComponent {
  selectedProduct!: ProductOverviewDTO;

  products: ProductOverviewDTO[] = []

  constructor(private productService: ProductService, private router: Router){}

  ngOnInit(){
    this.loadData()
  }

  loadData(): void{
    this.productService.getAllBySp(2).pipe(
      tap(response => {
        this.products = response
      })
    ).subscribe()
  }

  createProduct(): void{
    this.router.navigate(['home/create-product'])
  }
  editProduct(productId: number): void{
    this.router.navigate(['home/edit-product'], {
      state: {productId: productId} 
    })
  }

  deleteProduct(productId: number): void{
    this.productService.delete(productId).pipe(tap(response => {
      
    })).subscribe()
  }
}
