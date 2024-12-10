import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ServiceService } from '../service.service';
import { ReservationRequest } from '../reservation-request';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { EventOverviewDTO } from '../../event/event-overview-dto';
import { EventService } from '../../event/event.service';
import { JwtService } from '../../auth/jwt.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TimeslotDTO } from '../../my-events/dtos/CreateEventResponse.dto';

@Component({
  selector: 'app-reservation-dialog',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    CalendarModule,
    ReactiveFormsModule,
    InputNumberModule,
    ListboxModule,
    ToastModule
  ],
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.scss',
  providers: [MessageService]
})
export class ReservationDialogComponent implements OnInit {
  @Input() serviceId!: number;

  visible = false;
  reservationForm: FormGroup;
  events: EventOverviewDTO[] = [];
  timeslots: TimeslotDTO[] = [];
  constructor(
    private serviceService: ServiceService,
    private fb: FormBuilder,
    private eventService: EventService,
    private jwtService: JwtService,
    private messageService: MessageService
  ) {
    this.reservationForm = this.fb.group({
      selectedEvent: new FormControl<EventOverviewDTO | null>(null),
      startTime: [null],
      endTime: [null]
    });
  }
  ngOnInit(): void {
    this.eventService.getByEo(this.jwtService.getIdFromToken()).subscribe({
      next: (data: EventOverviewDTO[]) => {
        this.events = data;
      }
    });
    this.serviceService.getServiceTimeslots(this.serviceId).subscribe({
      next: (timeslots) => {
        this.timeslots = timeslots;
        // Process or display timeslots
      },
      error: (error) => {

      }
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
      if (this.reservationForm.value.selectedEvent === null || this.jwtService.getIdFromToken() === -1) {
        this.messageService.add({ severity: 'error', summary: 'Fail', detail: "Event not selected!" });
        return;
      }
      const reservationData: ReservationRequest = {
        eventId: this.reservationForm.value.selectedEvent.id,
        startTime: this.reservationForm.value.startTime,
        endTime: this.reservationForm.value.endTime,
        organizerId: this.jwtService.getIdFromToken()
      };



      this.serviceService.reserve(this.serviceId, reservationData)
  .subscribe({
    next: (response) => {
      this.visible = false;
      this.reservationForm.reset();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: "Reservation successful!"
      });

      // Fetch timeslots after successful reservation
      this.serviceService.getServiceTimeslots(this.serviceId).subscribe({
        next: (timeslots) => {
          this.timeslots = timeslots;
          // Process or display timeslots
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load timeslots'
          });
          console.error('Timeslots fetch error:', error);
        }
      });
    },
    error: (error) => {
      // Existing error handling for reservation
      if (error.error && error.error.message) {
        this.messageService.add({
          severity: 'error',
          summary: 'Reservation Error',
          detail: error.error.message
        });
      } else if (error.message) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to make reservation. Please try again.'
        });
      }
      console.error('Reservation error:', error);
    }
  });
    }
  }
}