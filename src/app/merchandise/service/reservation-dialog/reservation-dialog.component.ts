import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ServiceService } from '../service.service';
import { ReservationRequest } from '../model/reservation-request';
import { CalendarModule } from 'primeng/calendar';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { EventOverviewDTO } from '../../../event/model/event-overview-dto';
import { EventService } from '../../../event/event.service';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TimeslotDTO } from '../../../event/my-events/dtos/CreateEventResponse.dto';
import { CommonModule } from '@angular/common';

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
    ToastModule,
    CommonModule
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

  private validateDates(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup;
    const startTime = group.get('startTime')?.value;
    const endTime = group.get('endTime')?.value;

    if (startTime && endTime && new Date(endTime) <= new Date(startTime)) {
      return { endTimeBeforeStartTime: true };
    }
    return null;
  }

  constructor(
    private serviceService: ServiceService,
    private fb: FormBuilder,
    private eventService: EventService,
    private jwtService: JwtService,
    private messageService: MessageService
  ) {
    const formOptions: AbstractControlOptions = {
      validators: this.validateDates
    };

    this.reservationForm = this.fb.group({
      selectedEvent: new FormControl<EventOverviewDTO | null>(null),
      startTime: new FormControl<Date | null>(null, [Validators.required]),
      endTime: new FormControl<Date | null>(null)
    }, formOptions);
  }

  ngOnInit(): void {
    this.eventService.getByEo(this.jwtService.getIdFromToken()).subscribe({
      next: (data: EventOverviewDTO[]) => {
        this.events = data;
      },
      error: (error) => {
        // Handle error
      }
    });
    this.serviceService.getServiceTimeslots(this.serviceId).subscribe({
      next: (timeslots) => {
        this.timeslots = timeslots;
      },
      error: (error) => {
        // Handle error
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
    if (!this.reservationForm.valid) {
      if (this.reservationForm.errors?.['endTimeBeforeStartTime']) {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Fail', 
          detail: 'End time must be after start time' 
        });
        return;
      }
      
      if (this.reservationForm.get('startTime')?.errors?.['required']) {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Fail', 
          detail: 'Start time is required' 
        });
        return;
      }
      return;
    }

    if (this.reservationForm.value.selectedEvent === null) {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Fail', 
        detail: "Event not selected!" 
      });
      return;
    }

    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const reservationData: ReservationRequest = {
      eventId: this.reservationForm.value.selectedEvent.id,
      startTime: new Date((this.reservationForm.value.startTime).getTime() - timezoneOffset),
      endTime: this.reservationForm.value.endTime != null 
        ? new Date((this.reservationForm.value.endTime).getTime() - timezoneOffset) 
        : null,
      organizerId: this.jwtService.getIdFromToken()
    };

    this.serviceService.reserve(this.serviceId, reservationData)
      .subscribe({
        next: (response) => {
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