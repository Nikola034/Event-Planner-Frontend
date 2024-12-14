import { Component } from '@angular/core';
import { ReviewsTableComponent } from "./reviews-table/reviews-table.component";

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [ReviewsTableComponent],
  templateUrl: './admin-reviews.component.html',
  styleUrl: './admin-reviews.component.scss'
})
export class AdminReviewsComponent {

}
