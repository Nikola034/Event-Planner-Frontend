import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SendInvitationComponent } from "../send-invitation/send-invitation.component";
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { CreateEventTypeDTO } from '../create-event-type-form/dtos/create-event-type.dto';
import { ServiceService } from '../service/service.service';
import { tap } from 'rxjs';
import { response } from 'express';
import { Service } from '../service/service';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-create-event-form',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule, MultiSelectModule, RadioButtonModule, ButtonModule, ReactiveFormsModule, CalendarModule, CheckboxModule, SendInvitationComponent, DialogModule],
  templateUrl: './create-event-form.component.html',
  styleUrl: './create-event-form.component.scss'
})
export class CreateEventFormComponent {
  addEventTypeForm!: FormGroup;

  constructor(private fb: FormBuilder, private serviceService: ServiceService, private productService: ProductService) {
    this.addEventTypeForm = this.fb.group({
    title: [''],
    description: [''],
    date: [''],
    address: [''],
    maxParticipants: [''],
    public: ['']
  });}
  
  eventTypes: CreateEventTypeDTO[] = []
  services: Service[] = []
  products: string[] = []

  ngOnInit(){
      this.serviceService.getAll().pipe(tap(response => {
        console.log(response)
      })).subscribe()
      
  }
}
