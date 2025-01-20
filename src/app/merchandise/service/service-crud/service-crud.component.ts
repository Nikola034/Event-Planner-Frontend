import { Component, OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CurrencyPipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Service } from '../model/service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CreateServiceResponse } from '../model/create-response';
import { ServiceService } from '../service.service';
import { ServicesCalendarComponent } from '../services-calendar/services-calendar.component';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-service-crud',
  standalone: true,
  imports: [ButtonModule, DropdownModule, RouterModule, TableModule, CurrencyPipe, DialogModule, CommonModule, ServicesCalendarComponent, ToastModule],
  templateUrl: './service-crud.component.html',
  styleUrl: './service-crud.component.scss',
  providers: [MessageService]
})

export class ServiceCrudComponent implements OnInit {
  allServices: CreateServiceResponse[] = [];
  constructor(private serviceService: ServiceService, private jwtService: JwtService, private router: Router, private messageService: MessageService) {}
  ngOnInit(): void {
      this.serviceService.getAllBySpId(this.jwtService.getIdFromToken()).subscribe({
        next: (response) => {
          this.allServices = response;
        },
        error: (err) => {
          if (err.error && err.error.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error loading Services',
              detail: err.error.message
            });
          } else if (err.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error loading Services',
              detail: err.message
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error loading Services',
              detail: 'Failed to loading service. Please try again.'
            });
          }
        }
      });
  }
  displayAddForm: boolean = false;
  showAddServiceForm() {
    this.displayAddForm = true;
  }

  createService(): void {
    this.router.navigate(['home/create_service']);
  }

  editService(serviceId: number): void {
    this.router.navigate(['home/edit_service', serviceId]);
  }

  selectedService!: Service;
  displayEditForm: boolean = false;
  showEditServiceForm(service: Service) {
    this.selectedService = service;
    this.displayEditForm = true;
  }

  addService(createdService: CreateServiceResponse) {
    this.serviceService.getAllBySpId(createdService.serviceProviderId).subscribe({
      next: (response) => {
        this.allServices = response;
      },
      error: (err) => {
        if (err.error && err.error.message) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Services',
            detail: err.error.message
          });
        } else if (err.message) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Services',
            detail: err.message
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Services',
            detail: 'Failed to loading service. Please try again.'
          });
        }
      }
    });
    this.displayAddForm = false;
  }

  updateService(updatedService: CreateServiceResponse) {
    this.serviceService.getAllBySpId(updatedService.serviceProviderId).subscribe({
      next: (response) => {
        this.allServices = response;
      },
      error: (err) => {
        if (err.error && err.error.message) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Services',
            detail: err.error.message
          });
        } else if (err.message) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Services',
            detail: err.message
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Services',
            detail: 'Failed to loading service. Please try again.'
          });
        }
      }
    });

    this.displayEditForm = false;
  }

  deleteService(service: CreateServiceResponse) {
    this.serviceService.delete(service.id).subscribe({
      next: () => {
        this.serviceService.getAllBySpId(service.serviceProviderId).subscribe({
          next: (response) => {
            this.allServices = response;
          },
          error: (err) => {
            if (err.error && err.error.message) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error loading Services',
                detail: err.error.message
              });
            } else if (err.message) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error loading Services',
                detail: err.message
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error loading Services',
                detail: 'Failed to loading service. Please try again.'
              });
            }
          }
        });
      }, error: (err) => {
        if (err.error && err.error.message) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error deliting service',
            detail: err.error.message
          });
        } else if (err.message) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error deliting service',
            detail: err.message
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error deliting service',
            detail: 'Failed to delete service. Please try again.'
          });
        }
      }
    });
  }

}
