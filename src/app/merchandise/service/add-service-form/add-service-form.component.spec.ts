import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { AddServiceFormComponent } from './add-service-form.component';
import { Router } from '@angular/router';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { PhotoService } from '../../../shared/photos/photo.service';
import { ServiceService } from '../service.service';
import { MessageService } from 'primeng/api';
import { CategoryService } from '../../category/category.service';
import { EventTypeService } from '../../../event-type/event-type.service';
import { of, throwError } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { MapComponent } from '../../../shared/map/map.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { RecommendCategoryComponent } from '../../category/recommend-category/recommend-category.component';
import { CreateRequest } from '../model/create-request';
import { CategoryDto } from '../../category/model/category.dto';
import { CreateEventTypeResponseDTO } from '../../../event-type/create-event-type-form/dtos/create-event-type-response.dto';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddServiceFormComponent', () => {
  let component: AddServiceFormComponent;
  let fixture: ComponentFixture<AddServiceFormComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockCategoryService: jasmine.SpyObj<CategoryService>;
  let mockEventTypeService: jasmine.SpyObj<EventTypeService>;
  let mockJwtService: jasmine.SpyObj<JwtService>;
  let mockPhotoService: jasmine.SpyObj<PhotoService>;
  let mockServiceService: jasmine.SpyObj<ServiceService>;
  let mockAdd: any;

  const mockAllCategories: CategoryDto[] = [
    {
      id: 1,
      title: 'Entertainment',
      description: 'Entertainment description',
      pending: false
    },
    {
      id: 2,
      title: 'Food',
      description: 'Food description',
      pending: false
    }
  ];

  const mockAllEventTypes: CreateEventTypeResponseDTO[] = [
    {
      id: 1,
      title: 'Wedding',
      description: 'Wedding Description',
      active: true,
      recommendedCategories: []
    },
    {
      id: 2,
      title: 'Birthday',
      description: 'Birthday Description',
      active: true,
      recommendedCategories: []
    }
  ];

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const jwtServiceSpy = jasmine.createSpyObj('JwtService', ['getIdFromToken']);
    const photoServiceSpy = jasmine.createSpyObj('PhotoService', ['getPhotoUrl', 'deleteMercPhoto', 'uploadMerchandisePhoto']);
    const serviceServiceSpy = jasmine.createSpyObj('ServiceService', ['create']);
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getAllApproved']);
    const eventTypeServiceSpy = jasmine.createSpyObj('EventTypeService', ['getAllActiveWp']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    mockAdd = spyOn(MessageService.prototype, 'add').and.callFake((c: any) => {
      console.log(c);
    });

    await TestBed.configureTestingModule({
      imports: [AddServiceFormComponent,
                MapComponent,
                RecommendCategoryComponent, 
                DropdownModule, 
                FormsModule, 
                MultiSelectModule, 
                RadioButtonModule, 
                ButtonModule,
                ReactiveFormsModule, 
                CommonModule, 
                ToastModule, 
                DialogModule,
                HttpClientTestingModule,
                BrowserAnimationsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: EventTypeService, useValue: eventTypeServiceSpy },
        { provide: JwtService, useValue: jwtServiceSpy },
        { provide: PhotoService, useValue: photoServiceSpy },
        { provide: ServiceService, useValue: serviceServiceSpy }
      ]
    }).compileComponents();

    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockServiceService = TestBed.inject(ServiceService) as jasmine.SpyObj<ServiceService>;
    mockMessageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    mockCategoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
    mockEventTypeService = TestBed.inject(EventTypeService) as jasmine.SpyObj<EventTypeService>;
    mockJwtService = TestBed.inject(JwtService) as jasmine.SpyObj<JwtService>;
    mockPhotoService = TestBed.inject(PhotoService) as jasmine.SpyObj<PhotoService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceFormComponent);
    component = fixture.componentInstance;

    mockCategoryService.getAllApproved.and.returnValue(of(mockAllCategories));
    mockEventTypeService.getAllActiveWp.and.returnValue(of(mockAllEventTypes));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with categories and event types', () => {
    component.ngOnInit();
    expect(component.allCategories).toEqual(mockAllCategories);
    expect(component.allEventTypes).toEqual(mockAllEventTypes);
    expect(mockCategoryService.getAllApproved).toHaveBeenCalled();
    expect(mockEventTypeService.getAllActiveWp).toHaveBeenCalled();
  });

  it('should handle successful service creation', fakeAsync(() => {
    component.addServiceForm.patchValue({
      title: 'New Service',
      description: 'New Service Description',
      specificity: 'New Service Specificity',
      city: 'Kragujevac',
      street: 'New Street',
      number: '7a',
      longitude: 17.54443,
      latitude: 45.657,
      price: 1000,
      discount: 10,
      categoryId: 1,
      eventTypesIds: [1,2],
      minDuration: 30,
      maxDuration: 60,
      reservationDeadline: 30,
      cancellationDeadline: 7,
      automaticReservation: true
    });

    const expectedDto: CreateRequest = {
      title: 'New Service',
      description: 'New Service Description',
      specificity: 'New Service Specificity',
      address: {
        city: 'Kragujevac',
        street: 'New Street',
        number: '7a',
        longitude: 17.54443,
        latitude: 45.657
      },
      price: 1000,
      discount: 10,
      categoryId: 1,
      eventTypesIds: [1,2],
      minDuration: 30,
      maxDuration: 60,
      reservationDeadline: 30,
      cancellationDeadline: 7,
      automaticReservation: true,
      merchandisePhotos: [],
      serviceProviderId: mockJwtService.getIdFromToken(),
    }

    mockServiceService.create.and.returnValue(of({
      id: 1,
      title: 'New Service',
      description: 'New Service Description',
      specificity: 'New Service Specificity',
      price: 1000,
      discount: 10,
      visible: false,
      available: false,
      category: {
        id: 1,
        title:'Entertainment',
        description:'Entertainment Description',
        pending: false
      },
      eventTypes: [
        {
          id: 1,
          title: 'Wedding',
          description: 'Wedding Description',
          active: true
        },
        {
          id: 2,
          title: 'Birthday',
          description: 'Birthday description',
          active: true
        }
      ],
      minDuration: 30,
      maxDuration: 60,
      reservationDeadline: 30,
      cancellationDeadline: 7,
      automaticReservation: true,
      photos: [],
      address: {
        city: 'Kragujevac',
        street: 'New Street',
        number: '7a',
        longitude: 17.54443,
        latitude: 45.657
      },
      serviceProviderId: 2
    }));

    component.submit();
    flush();

    expect(mockServiceService.create).toHaveBeenCalledWith(expectedDto);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home/my_services']);
  }));

  it('should handle service creation error', fakeAsync(() => {
    const errorMessage = 'Failed to create service';
    component.addServiceForm.patchValue({
      title: 'New Service',
      description: 'New Service Description',
      specificity: 'New Service Specificity',
      city: 'Kragujevac',
      street: 'New Street',
      number: '7a',
      longitude: 17.54443,
      latitude: 45.657,
      price: 1000,
      discount: 10,
      categoryId: 1,
      eventTypesIds: [1,2],
      minDuration: 30,
      maxDuration: 60,
      reservationDeadline: 30,
      cancellationDeadline: 7,
      automaticReservation: true
    });

    mockServiceService.create.and.returnValue(throwError(() => ({ error: { message: errorMessage } })));
    component.submit();
    tick();

    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Creating Service Error',
      detail: errorMessage
    });
  }));

  it('should handle category not selected error', () => {
    component.addServiceForm.patchValue({
      title: 'Test Service',
      description: 'Test Description',
      specificity: 'Test Specificity',
      price: 100,
      discount: 10,
      categoryId: -1, // Invalid categoryId
      eventTypesIds: [1],
      minDuration: 30,
      maxDuration: 60,
      reservationDeadline: 24,
      cancellationDeadline: 12,
      automaticReservation: true
    });

    component.isFormValid();

    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Fail',
      detail: 'Category not selected!'
    });
  });

  it('should handle error minimum duration greater than maximum', () => {
    component.addServiceForm.patchValue({
      title: 'Test Service',
      description: 'Test Description',
      specificity: 'Test Specificity',
      price: 100,
      discount: 10,
      categoryId: 1,
      eventTypesIds: [1],
      minDuration: 60,
      maxDuration: 30, // Invalid: maxDuration < minDuration
      reservationDeadline: 24,
      cancellationDeadline: 12,
      automaticReservation: true
    });

    component.isFormValid();

    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Fail',
      detail: 'Minimum Duration cannot be greater than Maximum!'
    });
  });

  it('should handle error cancellation deadline greater than reservation', () => {
    component.addServiceForm.patchValue({
      title: 'Test Service',
      description: 'Test Description',
      specificity: 'Test Specificity',
      price: 100,
      discount: 10,
      categoryId: 1,
      eventTypesIds: [1],
      minDuration: 30,
      maxDuration: 60,
      reservationDeadline: 24,
      cancellationDeadline: 48, // Invalid: cancellationDeadline > reservationDeadline
      automaticReservation: true
    });

    component.isFormValid();

    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Fail',
      detail: 'Cancellation Deadline cannot be greater than Reservation Deadline!'
    });
  });

  it('should validate required fields', () => {
    expect(component.addServiceForm.valid).toBeFalsy();
    
    component.addServiceForm.patchValue({
      title: 'Test Service',
      description: 'Test Description',
      specificity: 'Test Specificity',
      city: 'Test City',
      street: 'Test Street',
      number: '123',
      longitude: 0,
      latitude: 0,
      price: 100,
      discount: 10,
      categoryId: 1,
      eventTypesIds: [1],
      minDuration: 30,
      maxDuration: 60,
      reservationDeadline: 24,
      cancellationDeadline: 12,
      automaticReservation: true
    });

    expect(component.addServiceForm.valid).toBeTruthy();
  });

  it('should handle photo upload success', () => {
    const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const mockEvent = { target: { files: [mockFile] } };
    const mockPhotoId = 123;

    mockPhotoService.uploadMerchandisePhoto.and.returnValue(of(mockPhotoId));

    component.uploadFile(mockEvent);

    expect(mockPhotoService.uploadMerchandisePhoto).toHaveBeenCalledWith(mockFile);
    expect(component.photosToAdd.length).toBe(1);
    expect(component.photosToAdd[0].id).toBe(mockPhotoId);
  });

  it('should validate price value', () => {
    component.addServiceForm.patchValue({
      title: 'title',
      description: 'desc',
      specificity: 'spec',
      city: 'city',
      street: 'street',
      number: 'num',
      longitude: 20.123,
      latitude: 45.123,
      price: -100, //price < 0
      discount: 10,
      categoryId: 1,
      eventTypesIds: [1,2],
      minDuration: 30,
      maxDuration: 60,
      reservationDeadline: 30,
      cancellationDeadline: 7,
      automaticReservation: true
    });

    expect(component.addServiceForm.controls['price'].valid).toBeFalsy();
  });

  it('should validate discount value', () => {
    component.addServiceForm.patchValue({
      title: 'title',
      description: 'desc',
      specificity: 'spec',
      city: 'city',
      street: 'street',
      number: 'num',
      longitude: 20.123,
      latitude: 45.123,
      price: 100,
      discount: -10, //discount < 0
      categoryId: 1,
      eventTypesIds: [1,2],
      minDuration: 30,
      maxDuration: 60,
      reservationDeadline: 30,
      cancellationDeadline: 7,
      automaticReservation: true
    });
    
    expect(component.addServiceForm.controls['discount'].valid).toBeFalsy();
    component.addServiceForm.patchValue({ discount: 120 }); //discount > 100
    expect(component.addServiceForm.controls['discount'].valid).toBeFalsy();
  });

  it('should validate minDuration value', () => {
    component.addServiceForm.patchValue({
      title: 'title',
      description: 'desc',
      specificity: 'spec',
      city: 'city',
      street: 'street',
      number: 'num',
      longitude: 20.123,
      latitude: 45.123,
      price: 100,
      discount: 10,
      categoryId: 1,
      eventTypesIds: [1,2],
      minDuration: -30, //minDuration < 0
      maxDuration: 60,
      reservationDeadline: 30,
      cancellationDeadline: 7,
      automaticReservation: true
    });

    expect(component.addServiceForm.controls['minDuration'].valid).toBeFalsy();
  });

  it('should validate maxDuratrion value', () => {
    component.addServiceForm.patchValue({
      title: 'title',
      description: 'desc',
      specificity: 'spec',
      city: 'city',
      street: 'street',
      number: 'num',
      longitude: 20.123,
      latitude: 45.123,
      price: 100,
      discount: 10,
      categoryId: 1,
      eventTypesIds: [1,2],
      minDuration: 30,
      maxDuration: -60, //maxDuration < 0
      reservationDeadline: 30,
      cancellationDeadline: 7,
      automaticReservation: true
    });

    expect(component.addServiceForm.controls['maxDuration'].valid).toBeFalsy();
  });

  it('should validate reservationDeadline value', () => {
    component.addServiceForm.patchValue({
      title: 'title',
      description: 'desc',
      specificity: 'spec',
      city: 'city',
      street: 'street',
      number: 'num',
      longitude: 20.123,
      latitude: 45.123,
      price: 100,
      discount: 10,
      categoryId: 1,
      eventTypesIds: [1,2],
      minDuration: 30,
      maxDuration: 60,
      reservationDeadline: -30, //reservationDeadline < 0
      cancellationDeadline: 7,
      automaticReservation: true
    });

    expect(component.addServiceForm.controls['reservationDeadline'].valid).toBeFalsy();
  });

  it('should validate cancellationDeadline value', () => {
    component.addServiceForm.patchValue({
      title: 'title',
      description: 'desc',
      specificity: 'spec',
      city: 'city',
      street: 'street',
      number: 'num',
      longitude: 20.123,
      latitude: 45.123,
      price: 100,
      discount: 10,
      categoryId: 1,
      eventTypesIds: [1,2],
      minDuration: 30,
      maxDuration: 60,
      reservationDeadline: 30,
      cancellationDeadline: -7, //cancellationDeadline < 0
      automaticReservation: true
    });

    expect(component.addServiceForm.controls['cancellationDeadline'].valid).toBeFalsy();
  });
});
