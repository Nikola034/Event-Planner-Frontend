import { Component, Input } from '@angular/core';
import { EventDetailsDTO } from '../event/EventDetailsDTO';
import { EventService } from '../event/event.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtService } from '../auth/jwt.service';
import { response } from 'express';
import { ChartModule } from 'primeng/chart';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, ButtonModule, ChartModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
})
export class EventDetailsComponent {
  eventDetails!: EventDetailsDTO;
  isFavorited: boolean = false;

  participants: any[] = [];
  reviewChartData: any;
  reviewChartOptions: any;

  constructor(
    private eventService: EventService,
    private router: Router,
    private jwtService: JwtService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.eventService
      .getEventDetails(history.state.eventId)
      .pipe(
        tap((response) => {
          this.eventDetails = response;
        })
      )
      .subscribe();
  }

  toggleFavorite(): void {
    this.isFavorited = !this.isFavorited;
    this.eventService
      .favorizeEvent(
        this.eventDetails.id,
        2 /*this.jwtService.getIdFromToken()*/
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
    this.eventService
      .getReport(this.eventDetails.id)
      .pipe(
        tap((response) => {
          this.participants = response.participants;
  
          // Prepare chart data for reviews
          const ratings = response.reviews.map((review: any) => review.rating);
  
          const gradeCounts = Array(5).fill(0); // Initialize counts for grades 1-5
          ratings.forEach((rating: number) => {
            gradeCounts[rating - 1]++;
          });
  
          this.reviewChartData = {
            labels: Array.from({ length: 5 }, (_, i) => `${i + 1}`),
            datasets: [
              {
                label: 'Number of Ratings',
                data: gradeCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          };
  
          this.reviewChartOptions = {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              tooltip: {
                enabled: true,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          };
  
          // Generate PDF after rendering the chart
      const reportContent = document.getElementById('report-content');
      if (reportContent) {
        reportContent.style.display = 'block'; // Make content visible temporarily

        html2canvas(reportContent).then((canvas) => {
          const pdf = new jsPDF();
          const imgWidth = 208;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          const imgData = canvas.toDataURL('image/png');
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save('event-report.pdf');

          reportContent.style.display = 'none'; // Hide content again
        }).catch((error) => {
          console.error('Error generating PDF:', error);
        });
      }
        })
      )
      .subscribe();
  }
  
  
  
}
