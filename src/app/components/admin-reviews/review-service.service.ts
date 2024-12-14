import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewOverviewDTO } from './review-overview-dto';
import { API_URL } from '../../../globals';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${API_URL}/api/v1/reviews`; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  getAllPendingReviews(): Observable<ReviewOverviewDTO[]> {
    return this.http.get<ReviewOverviewDTO[]>(`${this.apiUrl}/pending`);
  }

  approveReview(reviewId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${reviewId}/approve`, {});
  }

  rejectReview(reviewId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${reviewId}/deny`, {});
  }
}