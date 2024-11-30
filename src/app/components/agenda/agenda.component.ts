import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CreateEventTypeFormComponent } from '../create-event-type-form/create-event-type-form.component';
import { EditEventTypeFormComponent } from '../edit-event-type-form/edit-event-type-form.component';
import { CreateActivityFormComponent } from "../create-activity-form/create-activity-form.component";

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, DialogModule, CreateActivityFormComponent],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent {
  displayAddForm: boolean = false;

  activities = [
    {
      title: 'Wedding',
      address: 'ahahahah',
      description: 'A beautiful wedding ceremony',
      start: 'safad',
      end: 'statadf'
    },
    {
      title: 'Wedding',
      address: 'ahahahah',
      description: 'A beautiful wedding ceremony',
      start: 'safad',
      end: 'statadf'
    },
    {
      title: 'Wedding',
      address: 'ahahahah',
      description: 'A beautiful wedding ceremony',
      start: 'safad',
      end: 'statadf'
    },
    {
      title: 'Wedding',
      address: 'ahahahah',
      description: 'A beautiful wedding ceremony',
      start: 'safad',
      end: 'statadf'
    },
    {
      title: 'Wedding',
      address: 'ahahahah',
      description: 'A beautiful wedding ceremony',
      start: 'safad',
      end: 'statadf'
    },
    {
      title: 'Wedding',
      address: 'ahahahah',
      description: 'A beautiful wedding ceremony',
      start: 'safad',
      end: 'statadf'
    },
    // Add more data as needed
  ];

  showAddForm() {
    this.displayAddForm = true;
  }

  onDelete(eventType: any): void {
    console.log('Delete clicked for', eventType);
    // Implement your delete logic here
  }
}
