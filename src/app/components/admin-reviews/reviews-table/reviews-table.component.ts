import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';

// Services and DTOs
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ReviewOverviewDTO } from '../review-overview-dto';
import { ReviewStatus } from '../review-status';
import { ReviewService } from '../review-service.service';


@Component({
  selector: 'app-reviews-table',
  templateUrl: './reviews-table.component.html',
  styleUrl:'./reviews-table.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    TagModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule
  ],
  providers: [MessageService, ConfirmationService],
  encapsulation:ViewEncapsulation.None
})
export class ReviewsTableComponent implements OnInit {
  reviews: ReviewOverviewDTO[] = [];
  selectedReviews: ReviewOverviewDTO[] = [];
  ReviewStatus = ReviewStatus;
  @ViewChild('dt') dt!: Table;

  constructor(
    private reviewService: ReviewService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadPendingReviews();
  }

  loadPendingReviews() {
    this.reviewService.getAllPendingReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load pending reviews'
        });
      }
    });
  }
  
  filterTable(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(value, 'contains');
  }

  getStatusSeverity(status: ReviewStatus) {
    switch (status) {
      case ReviewStatus.PENDING:
        return 'warning';
      case ReviewStatus.APPROVED:
        return 'success';
      case ReviewStatus.REJECTED:
        return 'danger';
      default:
        return 'info';
    }
  }

  approveReview(review: ReviewOverviewDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to approve this review?',
      header: 'Confirm Approval',
      icon: 'pi pi-check-circle',
      accept: () => {
        this.reviewService.approveReview(review.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Approved',
              detail: 'Review has been approved'
            });
            this.loadPendingReviews();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to approve review'
            });
          }
        });
      }
    });
  }

  rejectReview(review: ReviewOverviewDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to reject this review?',
      header: 'Confirm Rejection',
      icon: 'pi pi-times-circle',
      accept: () => {
        this.reviewService.rejectReview(review.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Rejected',
              detail: 'Review has been rejected'
            });
            this.loadPendingReviews();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to reject review'
            });
          }
        });
      }
    });
  }
}