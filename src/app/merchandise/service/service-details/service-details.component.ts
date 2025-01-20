import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MerchandiseDetailDTO } from '../../merchandise/model/merchandise-detail-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchandiseService } from '../../merchandise/merchandise.service';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { FieldsetModule } from 'primeng/fieldset';
import { PaginatorModule } from 'primeng/paginator';
import { MapComponent } from '../../../shared/map/map.component';
import { MapService } from '../../../shared/map/map.service';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { LeaveReviewComponent } from '../../../review/leave-review/leave-review.component';
import { ReviewService } from '../../../review/review-service.service';
import { ReviewType } from '../../../review/leave-review/review-request-dto';
import { PhotoService } from '../../../shared/photos/photo.service';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [
    PaginatorModule,
    MapComponent,
    ButtonModule,
    ReservationDialogComponent,
    FloatLabelModule,
    InputTextModule,
    CurrencyPipe,
    CommonModule,
    GalleriaModule,
    FieldsetModule,
    LeaveReviewComponent,
  ],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.scss',
})
export class ServiceDetailsComponent implements OnInit {
  @ViewChild(ReservationDialogComponent)
  reservationDialog!: ReservationDialogComponent;
  serviceId: number = -1;
  service: MerchandiseDetailDTO | null = null;
  isFavorited: boolean = false;
  images: any[] | undefined = [];
  paginatedReviews: any | undefined;
  isVisible: boolean = false;
  responsiveOptions: any[] = [
    {
      breakpoint: '991px',
      numVisible: 4,
    },
    {
      breakpoint: '767px',
      numVisible: 3,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private merchandiseService: MerchandiseService,
    private mapService: MapService,
    public jwtService: JwtService,
    private router: Router,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.serviceId = id ? Number(id) : -1;

    if (this.serviceId != -1) {
      this.merchandiseService
        .getMerchandiseDetails(this.serviceId)
        .pipe(
          switchMap((response) => {
            this.service = response;
            this.images = this.service.merchandisePhotos.map((x) =>
              this.photoService.getPhotoUrl(x.photo)
            );
            this.paginatedReviews = this.service?.reviews.slice(0, 5);
            this.mapService.updateMerchandiseAddresses(response);

            // Call to check if the service is favorited
            return this.merchandiseService.getFavorites().pipe(
              tap((favorites) => {
                this.isFavorited = favorites.some(
                  (x) => x.id === this.service?.id
                );
              })
            );
          })
        )
        .subscribe();

      this.reviewService
        .isEligibleForReview(
          this.jwtService.getIdFromToken(),
          this.serviceId,
          ReviewType.MERCHANIDSE_REVIEW
        )
        .subscribe({
          next: (response) => {
            this.isVisible = response;
          },
          error: (err) => {
            this.isVisible = false;
          },
        });
    }
  }

  openReservationDialog() {
    this.reservationDialog.openDialog();
  }

  isEoLogged() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return this.jwtService.getRoleFromToken() == 'EO';
    }
    return false;
  }

  toggleFavorite(): void {
    this.isFavorited = !this.isFavorited;
    this.merchandiseService
      .favorizeMerchandise(this.service?.id, this.jwtService.getIdFromToken())
      .pipe(tap((response) => {}))
      .subscribe();
  }

  calculatePrice(): number {
    const discountedPrice =
      this.service!.price -
      (this.service!.price * this.service!.discount) / 100;
    return Math.round(discountedPrice);
  }

  onPageChange(event: any) {
    const startIndex = event.first;
    const endIndex = startIndex + event.rows;
    this.paginatedReviews = this.service!.reviews.slice(startIndex, endIndex);
  }

  seeChat() {
    this.router.navigate([
      'home',
      'messenger',
      this.service?.serviceProviderId,
    ]);
  }
}
