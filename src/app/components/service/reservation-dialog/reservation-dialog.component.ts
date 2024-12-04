import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ServiceService } from '../service.service';
import { ReservationRequest } from '../reservation-request';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-reservation-dialog',
  standalone: true,
  imports: [
    DialogModule, 
    ButtonModule, 
    CalendarModule,
    ReactiveFormsModule,
    InputNumberModule
  ],
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.scss'
})
export class ReservationDialogComponent {
  @Input() serviceId!: number;
  
  visible = false;
  reservationForm: FormGroup;

  constructor(
    private serviceService: ServiceService,
    private fb: FormBuilder
  ) {
    this.reservationForm = this.fb.group({
      eventId: [null],
      startTime: [null],
      endTime: [null]
    });
  }


  openDialog() {
    this.visible = true;
    this.reservationForm.reset();
  }

  cancelReservation() {
    this.visible = false;
    this.reservationForm.reset();
  }

  submitReservation() {
    if (this.reservationForm.valid) {
      const reservationData: ReservationRequest = {
        ...this.reservationForm.value,
        organizerId:4
      };
      
      this.serviceService.reserve(this.serviceId,reservationData)
        .subscribe({
          next: (response) => {
            this.visible = false;
            this.reservationForm.reset();
            // Handle success 
          },
          error: (error) => {
            console.log(error);
          }
        });
    }
  }
}