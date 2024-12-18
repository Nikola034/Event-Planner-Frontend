import { Component, Input } from '@angular/core';
import { EventDetailsDTO } from '../event/EventDetailsDTO';
import { EventService } from '../event/event.service';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtService } from '../auth/jwt.service';
import { response } from 'express';
import { ChartModule } from 'primeng/chart';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpErrorResponse } from '@angular/common/http';
import { MapComponent } from '../map/map.component';
import { MapService } from '../map/map.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, ButtonModule, ChartModule,MapComponent],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
})
export class EventDetailsComponent {
  eventDetails!: EventDetailsDTO;
  isFavorited: boolean = false;
  eventId!: number

  participants: any[] = [];
  reviewChartData: any;
  reviewChartOptions: any;
  errorMessage:string='';

  constructor(
    private eventService: EventService,
    private router: Router,
    private jwtService: JwtService,
    private route: ActivatedRoute,
    private mapService:MapService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventId = id ? Number(id) : -1;

    this.eventService
      .getEventDetails(this.eventId)
      .pipe(
        switchMap((details) => {
          this.eventDetails = details;
          this.mapService.updateEventAddresses(details);
          return this.eventService.getFavorites().pipe(
            tap(response => {
              this.isFavorited = response.some(x => x.id == this.eventDetails.id);
              
            })
          )
        }),
        catchError((error: HttpErrorResponse) => {
                // Handle specific error scenarios
                this.errorMessage= this.getErrorMessage(error);
                return EMPTY; // Prevents unhandled error propagation
              })
      )
      .subscribe();
    
  }

  private getErrorMessage(error: HttpErrorResponse): string {
      // Check if error response has a body with a message
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        return error.error.message || 'Client-side error occurred';
      } else {
        // Server-side error
        // Try multiple ways to extract the error message
        if (error.error && error.error.message) {
          // Directly from error object
          return error.error.message;
        }
    
        if (error.error && typeof error.error === 'string') {
          // If error is a string message
          return error.error;
        }
    
        if (error.error && error.error.errorMessage) {
          // Alternative error message property
          return error.error.errorMessage;
        }
    
        // Fallback to status text or a generic message
        return error.statusText || 'An unexpected error occurred';
      }
    }


  toggleFavorite(): void {
    this.isFavorited = !this.isFavorited;
    this.eventService
      .favorizeEvent(
        this.eventDetails.id,
         this.jwtService.getIdFromToken()
      )
      .pipe(tap((response) => {}))
      .subscribe();
  }

  viewAgenda(): void {
    this.router.navigate(['home/agenda'], {
      state: { eventId: this.eventDetails.id },
    });
  }

  generateReport(): void {
    // this.eventService
    //   .getReport(this.eventDetails.id)
    //   .pipe(
    //     tap((response) => {
    //       this.participants = response.participants;

    //       // Prepare chart data for reviews
    //       const ratings = response.reviews.map((review: any) => review.rating);
  
    //       const gradeCounts = Array(5).fill(0); // Initialize counts for grades 1-5
    //       ratings.forEach((rating: number) => {
    //         gradeCounts[rating - 1]++;
    //       });
  
    //       this.reviewChartData = {
    //         labels: Array.from({ length: 5 }, (_, i) => `${i + 1}`),
    //         datasets: [
    //           {
    //             label: 'Number of Ratings',
    //             data: gradeCounts,
    //             backgroundColor: 'rgba(75, 192, 192, 0.6)',
    //             borderColor: 'rgba(75, 192, 192, 1)',
    //             borderWidth: 1,
    //           },
    //         ],
    //       };
  
    //       this.reviewChartOptions = {
    //         responsive: true,
    //         plugins: {
    //           legend: {
    //             display: true,
    //             position: 'top',
    //           },
    //           tooltip: {
    //             enabled: true,
    //           },
    //         },
    //         scales: {
    //           y: {
    //             beginAtZero: true,
    //           },
    //         },
    //       };
    //     })
    //   )
    //   .subscribe();
  }
  
}
