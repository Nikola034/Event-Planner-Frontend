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
import { PhotoService } from '../photos/photo.service';
import { JwtService } from '../auth/jwt.service';
import { ServicesCalendarComponent } from '../services-calendar/services-calendar.component';

@Component({
  selector: 'app-products-crud',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    RouterModule,
    TableModule,
    CurrencyPipe,
    DialogModule,
    EditServiceFormComponent,
    AddServiceFormComponent,
    CommonModule,
    ServicesCalendarComponent,
  ],
  templateUrl: './products-crud.component.html',
  styleUrl: './products-crud.component.scss',
})
export class ProductsCrudComponent {
  selectedProduct!: ProductOverviewDTO;

  products: ProductOverviewDTO[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private photoService: PhotoService,
    private jwtService: JwtService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.productService
      .getAllBySp(this.jwtService.getIdFromToken())
      .pipe(
        tap((response) => {
          this.products = response;
        })
      )
      .subscribe();
  }

  createProduct(): void {
    this.router.navigate(['home/create-product']);
  }
  editProduct(productId: number): void {
    this.router.navigate(['home/edit-product', productId]);
  }

  showProduct(productId: number) {
    this.productService
      .showProduct(productId)
      .pipe(tap((response) => {
        this.loadData()
      }))
      .subscribe();
  }

  availProduct(productId: number) {
    this.productService
      .availProduct(productId)
      .pipe(tap((response) => {
        this.loadData()
      }))
      .subscribe();
  }

  deleteProduct(productId: number): void {
    this.productService
      .delete(productId)
      .pipe(tap((response) => {
        this.loadData()
      }))
      .subscribe();
  }

  getPhotoUrl(photo: string): string {
    return this.photoService.getPhotoUrl(photo);
  }
}
