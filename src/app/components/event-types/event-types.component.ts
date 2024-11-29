import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CreateEventTypeFormComponent } from "../create-event-type-form/create-event-type-form.component";
import { EditEventTypeFormComponent } from '../edit-event-type-form/edit-event-type-form.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-event-types',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, CreateEventTypeFormComponent, EditEventTypeFormComponent, DialogModule],
  templateUrl: './event-types.component.html',
  styleUrl: './event-types.component.scss'
})

export class EventTypesComponent {
  displayAddForm: boolean = false;
  displayEditForm: boolean = false;

  eventTypes = [
    {
      title: 'Birthday Party',
      description: 'A fun-filled birthday celebration',
      recommendedServices: ['Cake', 'Balloons', 'Catering'],
      active: true,
    },
    {
      title: 'Wedding',
      description: 'A beautiful wedding ceremony',
      recommendedServices: ['Photography', 'Decorations', 'Catering'],
      active: false,
    },
    // Add more data as needed
  ];

  showAddForm() {
    this.displayAddForm = true;
  }
  showEditForm() {
    this.displayEditForm = true;
  }

  onUpdate(eventType: any): void {
    console.log('Update clicked for', eventType);
    // Implement your update logic here
  }

  onDelete(eventType: any): void {
    console.log('Delete clicked for', eventType);
    // Implement your delete logic here
  }
}