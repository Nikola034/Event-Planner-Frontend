import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceService } from './service.service';
import { ReservationRequest } from './model/reservation-request';
import { API_URL } from '../../../globals';

describe('ServiceService - Reservation Tests', () => {
  let service: ServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceService]
    });

    service = TestBed.inject(ServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no requests are outstanding
  });

  describe('reserve()', () => {
    it('should send POST request with valid reservation data', () => {
      // Arrange
      const serviceId = 123;
      const mockReservationRequest: ReservationRequest = {
        eventId: 1,
        startTime: new Date('2025-02-01T10:00:00'),
        endTime: new Date('2025-02-01T11:00:00'),
        organizerId: 456
      };

      const mockResponse = {
        id: 789,
        status: 'CONFIRMED',
        message: 'Reservation successful'
      };

      // Act
      service.reserve(serviceId, mockReservationRequest).subscribe(response => {
        // Assert
        expect(response).toEqual(mockResponse);
      });

      // Assert HTTP request
      const req = httpMock.expectOne(`${API_URL}/api/v1/services/${serviceId}/reserve`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockReservationRequest);

      // Respond with mock data
      req.flush(mockResponse);
    });

    it('should handle null values in request', () => {
      // Arrange
      const serviceId = 123;
      const mockReservationRequest: ReservationRequest = {
        eventId: null,
        startTime: new Date('2025-02-01T10:00:00'),
        endTime: new Date('2025-02-01T11:00:00'),
        organizerId: null
      };

      // Act
      service.reserve(serviceId, mockReservationRequest).subscribe();

      // Assert HTTP request
      const req = httpMock.expectOne(`${API_URL}/api/v1/services/${serviceId}/reserve`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockReservationRequest);

      req.flush({});
    });

    

    it('should handle error response from server', () => {
      // Arrange
      const serviceId = 123;
      const mockReservationRequest: ReservationRequest = {
        eventId: 1,
        startTime: new Date('2025-02-01T10:00:00'),
        endTime: new Date('2025-02-01T11:00:00'),
        organizerId: 456
      };

      const errorResponse = {
        status: 400,
        statusText: 'Bad Request',
        error: {
          message: 'Invalid reservation request'
        }
      };

      // Act
      service.reserve(serviceId, mockReservationRequest).subscribe({
        error: (error) => {
          // Assert
          expect(error.status).toBe(400);
          expect(error.error.message).toBe('Invalid reservation request');
        }
      });

      // Assert HTTP request
      const req = httpMock.expectOne(`${API_URL}/api/v1/services/${serviceId}/reserve`);
      req.flush(errorResponse.error, errorResponse);
    });

    it('should handle end time before start time', () => {
      // Arrange
      const serviceId = 123;
      const mockReservationRequest: ReservationRequest = {
        eventId: 1,
        startTime: new Date('2025-02-01T11:00:00'),
        endTime: new Date('2025-02-01T10:00:00'), // End time before start time
        organizerId: 456
      };

      const errorResponse = {
        status: 400,
        statusText: 'Bad Request',
        error: {
          message: 'End time cannot be before start time'
        }
      };

      // Act
      service.reserve(serviceId, mockReservationRequest).subscribe({
        error: (error) => {
          // Assert
          expect(error.status).toBe(400);
          expect(error.error.message).toBe('End time cannot be before start time');
        }
      });

      // Assert HTTP request
      const req = httpMock.expectOne(`${API_URL}/api/v1/services/${serviceId}/reserve`);
      req.flush(errorResponse.error, errorResponse);
    });
  });
});