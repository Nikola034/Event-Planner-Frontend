import { Component, Input } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ReviewRequestDTO } from './review-request-dto';
import { JwtService } from '../../infrastructure/auth/jwt.service';
import { ReviewService } from '../review-service.service';
import { response } from 'express';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-leave-review',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonModule, ToastModule],
  templateUrl: './leave-review.component.html',
  styleUrl: './leave-review.component.scss',
  providers: [MessageService]
})
export class LeaveReviewComponent {
  rating: number = 0;
  comment: string = '';
  @Input() type: string = '';
  @Input() id: number = -1;

  constructor(private jwtService: JwtService, private reviewService: ReviewService, private messageService: MessageService) { }

  submitReview() {
    const reviewRequest: ReviewRequestDTO = {
      comment: this.comment,
      rating: this.rating,
      reviewerId: this.jwtService.getIdFromToken(),
      type: this.type
    }
    if(this.id !== -1) {
      this.reviewService.leaveReview(this.id, reviewRequest).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Added review',
            detail: 'Thank you for leaving review!'
          });
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

  }
}
