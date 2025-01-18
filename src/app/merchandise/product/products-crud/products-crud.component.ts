import { CurrencyPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { EditServiceFormComponent } from '../../service/edit-service-form/edit-service-form.component';
import { AddServiceFormComponent } from '../../service/add-service-form/add-service-form.component';
import { Product } from '../model/product';
import { MerchandiseOverviewDTO } from '../../merchandise/model/merchandise-overview-dto';
import { ProductOverviewDTO } from '../../merchandise/model/product-overview.dto';
import { ProductService } from '../product.service';
import { tap } from 'rxjs';
import { response } from 'express';
import { PhotoService } from '../../../shared/photos/photo.service';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { ServicesCalendarComponent } from '../../service/services-calendar/services-calendar.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
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
    private jwtService: JwtService,
    private confirmationService: ConfirmationService
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
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      header: 'Confirm Denial',
      icon: 'pi pi-times-circle',
      accept: () => {
        this.productService
        .delete(productId)
        .pipe(tap((response) => {
          this.loadData()
        }))
        .subscribe();
      },
    });
  }

  getPhotoUrl(photo: string): string {
    return this.photoService.getPhotoUrl(photo);
  }
}
