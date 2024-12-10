import { Component, OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { RouterLink, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CurrencyPipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Service } from '../service';
import { EditServiceFormComponent } from '../edit-service-form/edit-service-form.component';
import { AddServiceFormComponent } from '../add-service-form/add-service-form.component';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CreateServiceResponse } from '../create-response';
import { ServiceService } from '../service.service';
import { response } from 'express';

@Component({
  selector: 'app-service-crud',
  standalone: true,
  imports: [ButtonModule, DropdownModule, RouterModule, TableModule, CurrencyPipe, DialogModule, EditServiceFormComponent, AddServiceFormComponent, CommonModule],
  templateUrl: './service-crud.component.html',
  styleUrl: './service-crud.component.scss'
})

export class ServiceCrudComponent implements OnInit {
  allServices: CreateServiceResponse[] = [];
  constructor(private serviceService: ServiceService) {}
  ngOnInit(): void {
      this.serviceService.getAllBySpId(2).subscribe({
        next: (response) => {
          this.allServices = response;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  displayAddForm: boolean = false;
  showAddServiceForm() {
    this.displayAddForm = true;
  }

  selectedService!: Service;
  displayEditForm: boolean = false;
  showEditServiceForm(service: Service) {
    this.selectedService = service;
    this.displayEditForm = true;
  }

  createService(createdService: CreateServiceResponse) {
    this.serviceService.getAllBySpId(createdService.serviceProviderId).subscribe({
      next: (response) => {
        this.allServices = response;
      },
      error: (err) => {
        console.error(err);
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
        console.error(err);
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
            console.error(err);
          }
        });
      }, error: (err) => {
        console.error(err);
      }
    });
  }

  
}
