import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { ReservationDialogComponent } from './reservation-dialog.component';
import { ServiceService } from '../service.service';
import { EventService } from '../../../event/event.service';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Address } from '../../../shared/address/address';
import { TimeslotDTO } from '../../../event/my-events/dtos/CreateEventResponse.dto';
import { EventOverviewDTO } from '../../../event/model/event-overview-dto';
import { MessageService } from 'primeng/api';



describe('ReservationDialogComponent', () => {
  let component: ReservationDialogComponent;
  let fixture: ComponentFixture<ReservationDialogComponent>;
  let serviceService: jasmine.SpyObj<ServiceService>;
  let eventService: jasmine.SpyObj<EventService>;
  let jwtService: jasmine.SpyObj<JwtService>;
  let messageService: any;
  let mockAdd:any;

  const mockAddress: Address = {
    street: 'Test Street',
    city: 'Test City',
    number: '123',
    latitude: 0,
    longitude: 0
  };

  const mockEvents: EventOverviewDTO[] = [
    {
      id: 1,
      type: 'Concert',
      title: 'Test Event',
      date: new Date('2025-01-15T10:00:00'),
      address: mockAddress,
      description: 'Test Description',
      isPublic: true
    }
  ];

  const mockTimeslots: TimeslotDTO[] = [
    {
      id: 1,
      startTime: '2025-01-15T08:00:00',
      endTime: '2025-01-15T09:00:00'
    }
  ];

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('ServiceService', ['reserve', 'getServiceTimeslots']);
    const eventSpy = jasmine.createSpyObj('EventService', ['getByEo']);
    const jwtSpy = jasmine.createSpyObj('JwtService', ['getIdFromToken']);
    const mockMessageService = jasmine.createSpyObj('MessageService', ['add']);
    mockAdd= spyOn(MessageService.prototype, 'add').and.callFake((c: any) => {
      console.log(c);
    });
  
    await TestBed.configureTestingModule({
      imports: [
        ReservationDialogComponent,
        DialogModule,
        ButtonModule,
        CalendarModule,
        ReactiveFormsModule,
        InputNumberModule,
        ListboxModule,
        ToastModule,
        CommonModule,
        BrowserAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: MessageService, useValue: mockMessageService }, 
        { provide: ServiceService, useValue: serviceSpy },
        { provide: EventService, useValue: eventSpy },
        { provide: JwtService, useValue: jwtSpy }
      ]
    }).compileComponents();
  
    serviceService = TestBed.inject(ServiceService) as jasmine.SpyObj<ServiceService>;
    eventService = TestBed.inject(EventService) as jasmine.SpyObj<EventService>;
    jwtService = TestBed.inject(JwtService) as jasmine.SpyObj<JwtService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });
  

  beforeEach(() => {
    // Spy on MessageService after it's injected
    
    fixture = TestBed.createComponent(ReservationDialogComponent);
    component = fixture.componentInstance;
    component.serviceId = 1;
    
    eventService.getByEo.and.returnValue(of(mockEvents));
    serviceService.getServiceTimeslots.and.returnValue(of(mockTimeslots));
    jwtService.getIdFromToken.and.returnValue(1);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with events and timeslots', () => {
    component.ngOnInit();
    expect(component.events).toEqual(mockEvents);
    expect(component.timeslots).toEqual(mockTimeslots);
    expect(eventService.getByEo).toHaveBeenCalled();
    expect(serviceService.getServiceTimeslots).toHaveBeenCalledWith(1);
  });

  it('should open dialog and reset form', () => {
    component.openDialog();
    expect(component.visible).toBeTrue();
    expect(component.reservationForm.value).toEqual({
      selectedEvent: null,
      startTime: null,
      endTime: null
    });
  });

  it('should cancel reservation and reset form', () => {
    component.cancelReservation();
    expect(component.visible).toBeFalse();
    expect(component.reservationForm.value).toEqual({
      selectedEvent: null,
      startTime: null,
      endTime: null
    });
  });

  it('should show error when submitting without selected event', fakeAsync(() => {
    // Arrange
    component.visible = true;
    fixture.detectChanges();
    const startTime = new Date('2025-01-15T10:00:00');
    const endTime = new Date('2025-01-15T11:00:00');

    component.reservationForm.patchValue({
      selectedEvent: null,
      startTime: startTime,
      endTime: endTime
    });
    fixture.detectChanges();

    // Act
    component.submitReservation();
    fixture.detectChanges();
    flush();

    // Assert
    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Fail',
      detail: 'Event not selected!'
    });
  }));

  it('should successfully submit reservation with end date', fakeAsync(() => {
    const startTime = new Date('2025-01-15T10:00:00');
    const endTime = new Date('2025-01-15T11:00:00');

    component.reservationForm.patchValue({
      selectedEvent: mockEvents[0],
      startTime: startTime,
      endTime: endTime
    });

    serviceService.reserve.and.returnValue(of({}));

    component.submitReservation();
    flush();

    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const expectedStartTime = new Date(startTime.getTime() - timezoneOffset);
    const expectedEndTime = new Date(endTime.getTime() - timezoneOffset);

    expect(serviceService.reserve).toHaveBeenCalledWith(1, {
      eventId: 1,
      startTime: expectedStartTime,
      endTime: expectedEndTime,
      organizerId: 1
    });

    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Reservation successful!'
    });

    expect(component.reservationForm.value).toEqual({
      selectedEvent: null,
      startTime: null,
      endTime: null
    });
  }));

  it('should successfully submit reservation without end date', fakeAsync(() => {
    const startTime = new Date('2025-01-15T10:00:00');
    const endTime = null;

    component.reservationForm.patchValue({
      selectedEvent: mockEvents[0],
      startTime: startTime,
      endTime: endTime
    });

    serviceService.reserve.and.returnValue(of({}));

    component.submitReservation();
    flush();

    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const expectedStartTime = new Date(startTime.getTime() - timezoneOffset);
    const expectedEndTime = null;

    expect(serviceService.reserve).toHaveBeenCalledWith(1, {
      eventId: 1,
      startTime: expectedStartTime,
      endTime: expectedEndTime,
      organizerId: 1
    });

    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Reservation successful!'
    });

    expect(component.reservationForm.value).toEqual({
      selectedEvent: null,
      startTime: null,
      endTime: null
    });
  }));

  it('should handle reservation error', fakeAsync(() => {
    const errorMessage = 'Reservation failed';
    const startTime = new Date('2025-01-15T10:00:00');
    const endTime = new Date('2025-01-15T11:00:00');

    component.reservationForm.patchValue({
      selectedEvent: mockEvents[0],
      startTime: startTime,
      endTime: endTime
    });

    serviceService.reserve.and.returnValue(throwError(() => ({ error: { message: errorMessage } })));

    component.submitReservation();
    tick();

    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Reservation Error',
      detail: errorMessage
    });
  }));

  it('should handle timeslots refresh error after successful reservation', fakeAsync(() => {
    const startTime = new Date('2025-01-15T10:00:00');
    const endTime = new Date('2025-01-15T11:00:00');

    component.reservationForm.patchValue({
      selectedEvent: mockEvents[0],
      startTime: startTime,
      endTime: endTime
    });

    serviceService.reserve.and.returnValue(of({}));
    serviceService.getServiceTimeslots.and.returnValue(throwError(() => new Error()));

    component.submitReservation();
    tick();

    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load timeslots'
    });
  }));

  it('should validate start time is required', fakeAsync(() => {
    // Arrange
    component.visible = true;
    fixture.detectChanges();
  
    component.reservationForm.patchValue({
      selectedEvent: mockEvents[0],
      startTime: null,
      endTime: new Date()
    });
    fixture.detectChanges();
  
    // Act
    component.submitReservation();
    flush();
  
    // Assert
    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Fail',
      detail: "Start time is required"
    });
    expect(serviceService.reserve).not.toHaveBeenCalled();
  }));
  
  it('should validate end time is after start time', fakeAsync(() => {
    // Arrange
    const startTime = new Date('2025-01-15T11:00:00');
    const endTime = new Date('2025-01-15T10:00:00'); // End time before start time
  
    component.reservationForm.patchValue({
      selectedEvent: mockEvents[0],
      startTime: startTime,
      endTime: endTime
    });
  
    component.submitReservation();
    flush();
  
    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Fail',
      detail: "End time must be after start time"
    });
    expect(serviceService.reserve).not.toHaveBeenCalled();
  }));
  
  
  
  it('should handle events loading error', fakeAsync(() => {
    // Reset the component to remove the beforeEach setup
    component = new ReservationDialogComponent(
      serviceService,
      TestBed.inject(FormBuilder),
      eventService,
      jwtService,
      TestBed.inject(MessageService)
    );
    component.serviceId = 1;
    
    // Set up the error case
    eventService.getByEo.and.returnValue(throwError(() => new Error('Failed to load events')));
    
    // Act
    component.ngOnInit();
    tick();

    // Assert
    expect(component.events).toEqual([]);
  }));

  it('should handle timeslots loading error', fakeAsync(() => {
    // Reset the component to remove the beforeEach setup
    component = new ReservationDialogComponent(
      serviceService,
      TestBed.inject(FormBuilder),
      eventService,
      jwtService,
      TestBed.inject(MessageService)
    );
    component.serviceId = 1;
    
    // Set up the error case
    serviceService.getServiceTimeslots.and.returnValue(throwError(() => new Error('Failed to load timeslots')));
    
    // Act
    component.ngOnInit();
    tick();

    // Assert
    expect(component.timeslots).toEqual([]);
  }));
  
  it('should handle network error during reservation', fakeAsync(() => {
    // Arrange
    const startTime = new Date('2025-01-15T10:00:00');
    const endTime = new Date('2025-01-15T11:00:00');

    component.reservationForm.patchValue({
      selectedEvent: mockEvents[0],
      startTime: startTime,
      endTime: endTime
    });
  
    serviceService.reserve.and.returnValue(throwError(() => new Error('Network error')));
  
    // Act
    component.submitReservation();
    tick();
  
    // Assert
    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Network error'
    });
  }));
  
  it('should preserve form values when reservation fails', fakeAsync(() => {
    // Arrange
    const startTime = new Date('2025-01-15T10:00:00');
    const endTime = new Date('2025-01-15T11:00:00');
    
    component.reservationForm.patchValue({
      selectedEvent: mockEvents[0],
      startTime: startTime,
      endTime: endTime
    });
  
    serviceService.reserve.and.returnValue(throwError(() => new Error('Reservation failed')));
  
    // Act
    component.submitReservation();
    tick();
  
    // Assert
    expect(component.reservationForm.value).toEqual({
      selectedEvent: mockEvents[0],
      startTime: startTime,
      endTime: endTime
    });
  }));
  
  it('should handle server validation errors with detailed messages', fakeAsync(() => {
    // Arrange
    const startTime = new Date('2025-01-15T10:00:00');
    const endTime = new Date('2025-01-15T11:00:00');

    component.reservationForm.patchValue({
      selectedEvent: mockEvents[0],
      startTime: startTime,
      endTime: endTime
    });
  
    const validationError = {
      error: {
        message: 'Timeslot already reserved',
        details: ['The selected time period is not available']
      }
    };
  
    serviceService.reserve.and.returnValue(throwError(() => validationError));
  
    // Act
    component.submitReservation();
    tick();
  
    // Assert
    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Reservation Error',
      detail: 'Timeslot already reserved'
    });
  }));
});