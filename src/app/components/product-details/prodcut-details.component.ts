import { Component, OnInit } from '@angular/core';
import { MerchandiseDetailDTO } from '../merchandise/merchandise-detail-dto';
import { ActivatedRoute } from '@angular/router';
import { MerchandiseService } from '../merchandise/merchandise.service';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'app-prodcut-details',
  standalone: true,
  imports: [PaginatorModule, ButtonModule, CurrencyPipe, CommonModule, GalleriaModule, FieldsetModule],
  templateUrl: './prodcut-details.component.html',
  styleUrl: './prodcut-details.component.scss'
})
export class ProdcutDetailsComponent implements OnInit {
  serviceId: number = -1;
    product: MerchandiseDetailDTO | null = null;
    isStarFilled: boolean = false;
    images: any[] = [];
    paginatedReviews: any | undefined;
    responsiveOptions: any[] = [
      {
          breakpoint: '991px',
          numVisible: 4
      },
      {
          breakpoint: '767px',
          numVisible: 3
      },
      {
          breakpoint: '575px',
          numVisible: 1
      }
  ];
  
    constructor(private route: ActivatedRoute, private merchandiseService: MerchandiseService) {}
  
    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      this.serviceId = id ? Number(id) : -1;
  
      if(this.serviceId != -1) {
        this.merchandiseService.getMerchandiseDetails(this.serviceId).subscribe({
          next: (response) => {
            this.product = response;
            this.images = this.product.merchandisePhotos;
            this.paginatedReviews = this.product.reviews.slice(0,5);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    }

    buyProduct() {}
  
    addToFavorite() {
      //logic for adding service to favorite
      this.isStarFilled = !this.isStarFilled;
    }
  
    calculatePrice(): number {
      const discountedPrice = this.product!.price - (this.product!.price * this.product!.discount)/100;
      return Math.round(discountedPrice);
    }
  
    onPageChange(event: any) {
      const startIndex = event.first;
      const endIndex = startIndex + event.rows;
      this.paginatedReviews = this.product!.reviews.slice(startIndex, endIndex);
    }
}
