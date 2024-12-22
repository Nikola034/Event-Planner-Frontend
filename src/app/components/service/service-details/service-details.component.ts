import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MerchandiseDetailDTO } from '../../merchandise/merchandise-detail-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchandiseService } from '../../merchandise/merchandise.service';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { GalleriaModule} from 'primeng/galleria';
import { FieldsetModule } from 'primeng/fieldset';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [PaginatorModule, ButtonModule,ReservationDialogComponent,FloatLabelModule,InputTextModule, CurrencyPipe, CommonModule, GalleriaModule, FieldsetModule],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.scss'
})
export class ServiceDetailsComponent implements OnInit {
  @ViewChild(ReservationDialogComponent)
  reservationDialog!: ReservationDialogComponent;
  serviceId: number = -1;
  service: MerchandiseDetailDTO | null = null;
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

  constructor(private route: ActivatedRoute, private merchandiseService: MerchandiseService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.serviceId = id ? Number(id) : -1;

    if(this.serviceId != -1) {
      this.merchandiseService.getMerchandiseDetails(this.serviceId).subscribe({
        next: (response) => {
          this.service = response;
          this.images = this.service.merchandisePhotos;
          this.paginatedReviews = this.service.reviews.slice(0,5);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
  openReservationDialog() {
    this.reservationDialog.openDialog();
  }

  addToFavorite() {
    //logic for adding service to favorite
    this.isStarFilled = !this.isStarFilled;
  }

  calculatePrice(): number {
    const discountedPrice = this.service!.price - (this.service!.price * this.service!.discount)/100;
    return Math.round(discountedPrice);
  }

  onPageChange(event: any) {
    const startIndex = event.first;
    const endIndex = startIndex + event.rows;
    this.paginatedReviews = this.service!.reviews.slice(startIndex, endIndex);
  }

  seeChat() {
    this.router.navigate(['home', 'messenger']);
  }
}
