import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RegisterEoFormComponent } from './register-eo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { PhotoService } from '../../../shared/photos/photo.service';
import { of, throwError } from 'rxjs';
import { RegisterEoResponseDto } from '../../../infrastructure/auth/model/register-dtos/RegisterEoResponse.dto';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { MessageService } from 'primeng/api';
import { UserService } from '../../user.service';

describe('RegisterEoFormComponent', () => {
  let component: RegisterEoFormComponent;
  let fixture: ComponentFixture<RegisterEoFormComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockJwtService: jasmine.SpyObj<JwtService>;
  let mockPhotoService: jasmine.SpyObj<PhotoService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockUserService: jasmine.SpyObj<UserService>; // Add this
  let mockAdd:any;
  let messageService: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockJwtService = jasmine.createSpyObj('JwtService', ['getRoleFromToken', 'getIdFromToken', 'registerEo', 'Logout']);
    mockPhotoService = jasmine.createSpyObj('PhotoService', ['uploadUserPhoto', 'deleteUserPhoto', 'getPhotoUrl']);
    mockUserService = jasmine.createSpyObj('UserService', ['getAuById']); // Add this
   mockMessageService = jasmine.createSpyObj('MessageService', ['add']);
    mockAdd= spyOn(MessageService.prototype, 'add').and.callFake((c: any) => {
      console.log(c);
    });

    // Set up default return values
    mockJwtService.getRoleFromToken.and.returnValue(''); // or whatever default value you want
    mockJwtService.getIdFromToken.and.returnValue(1); // or whatever default value you want
    mockUserService.getAuById.and.returnValue(of({
      id: 1,
      message: 'Success',
      name: 'Test',
      surname: 'User',
      phoneNumber: '1234567890',
      address: {
        city: 'Test City',
        street: 'Test Street',
        number: '123',
        latitude: 1,
        longitude: 1
      },
      email: 'test@test.com',
      password: 'hashedPassword',
      photo: '',
      role: 1, // assuming Role is a number enum
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token'
    }));

    await TestBed.configureTestingModule({
      imports: [
        RegisterEoFormComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        DialogModule,
        ButtonModule,
        CalendarModule,
        InputNumberModule,
        ListboxModule,
        CommonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: JwtService, useValue: mockJwtService },
        { provide: PhotoService, useValue: mockPhotoService },
        { provide: MessageService, useValue: mockMessageService },
        { provide: UserService, useValue: mockUserService } // Add this
      ],
    }).compileComponents();

    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    fixture = TestBed.createComponent(RegisterEoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle passwords not matching', fakeAsync(() => {
    component.registerForm.patchValue({
      name: 'Test',
      surname: 'User',
      phone: '1234567890',
      email: 'test@test.com',
      password1: 'password123',
      password2: 'differentPassword', // Intentional mismatch
      city: 'Test City',
      street: 'Test Street',
      number: '123',
      latitude: 1,
      longitude: 1
    });
  
    // Explicitly mark the form as touched to trigger validation
    component.registerForm.controls['password1'].markAsTouched();
    component.registerForm.controls['password2'].markAsTouched();
  
    fixture.detectChanges(); // Ensure the UI is updated with validation status
  
    // Call createAccount
    component.createAccount();
    tick();  // Use tick to resolve async operations
  
    // Check if messageService.add was called with the expected error message
    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Password Mismatch',
      detail: 'Passwords do not match'
    });
  }));
  
  it('should handle successful registration', fakeAsync(() => {
    // Set valid form values
    component.registerForm.patchValue({
      name: 'Test',
      surname: 'User',
      phone: '1234567890',
      email: 'test@test.com',
      password1: 'password123',
      password2: 'password123', // Matching passwords
      city: 'Test City',
      street: 'Test Street',
      number: '123',
      latitude: 1,
      longitude: 1
    });
  
    const expectedDto = {
      name: 'Test',
      surname: 'User',
      phoneNumber: '1234567890',
      email: 'test@test.com',
      password: 'password123',
      photo: null,
      role: 'EO',
      address: {
        city: 'Test City',
        street: 'Test Street',
        number: '123',
        latitude: 1,
        longitude: 1
      }
    };
  
    mockJwtService.registerEo.and.returnValue(of({
      id: 1,
      message: 'Success',
      name: 'Test',
      surname: 'User',
      phoneNumber: '1234567890',
      address: {
        city: 'Test City',
        street: 'Test Street',
        number: '123',
        latitude: 1,
        longitude: 1
      },
      email: 'test@test.com',
      password: 'password123',
      photo: '',
      role: 1,  // assuming Role is a number enum
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token'
    }));
  
    // Call createAccount
    component.createAccount();
    flush(); // Using flush to ensure all observables are resolved
  
    // Ensure the registerEo method was called with the expected DTO
    expect(mockJwtService.registerEo).toHaveBeenCalledWith(expectedDto, false);
    // Ensure the router navigated to the correct route
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home']);
    // Ensure the success message was added
    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Registration Successful',
      detail: 'Your account has been created successfully!'
    });
  }));

  it('should handle registration failure', fakeAsync(() => {
    // Set valid form values
    component.registerForm.patchValue({
      name: 'Test',
      surname: 'User',
      phone: '1234567890',
      email: 'test@test.com',
      password1: 'password123',
      password2: 'password123', // Matching passwords
      city: 'Test City',
      street: 'Test Street',
      number: '123',
      latitude: 1,
      longitude: 1
    });
  
    mockJwtService.registerEo.and.returnValue(throwError(() => new Error('Server error')));
  
    // Call createAccount
    component.createAccount();
    flush(); // Ensure all observables are resolved
  
    // Ensure the error message is shown
    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Registration Failed',
      detail: 'An error occurred while creating your account. Please try again later.'
    });
  }));

  it('should bind form values correctly', fakeAsync(() => {
    // Set form values
    component.registerForm.patchValue({
      name: 'Test',
      surname: 'User',
      phone: '1234567890',
      email: 'test@test.com',
      password1: 'password123',
      password2: 'password123', // Matching passwords
      city: 'Test City',
      street: 'Test Street',
      number: '123',
      latitude: 1,
      longitude: 1
    });
  
    // Check that form values are correctly bound
    expect(component.registerForm.value.name).toBe('Test');
    expect(component.registerForm.value.surname).toBe('User');
    expect(component.registerForm.value.phone).toBe('1234567890');
    expect(component.registerForm.value.email).toBe('test@test.com');
    expect(component.registerForm.value.password1).toBe('password123');
    expect(component.registerForm.value.password2).toBe('password123');
    expect(component.registerForm.value.city).toBe('Test City');
    expect(component.registerForm.value.street).toBe('Test Street');
    expect(component.registerForm.value.number).toBe('123');
    expect(component.registerForm.value.latitude).toBe(1);
    expect(component.registerForm.value.longitude).toBe(1);
  }));

});