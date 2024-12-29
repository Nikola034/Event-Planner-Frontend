import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CreateEventTypeFormComponent } from "../create-event-type-form/create-event-type-form.component";
import { EditEventTypeFormComponent } from '../edit-event-type-form/edit-event-type-form.component';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { CreateEventTypeResponseDTO } from '../create-event-type-form/dtos/create-event-type-response.dto';
import { EventTypeService } from '../create-event-type-form/event-type.service';
import { tap } from 'rxjs';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-event-types',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, CreateEventTypeFormComponent, EditEventTypeFormComponent, DialogModule, PaginatorModule],
  templateUrl: './event-types.component.html',
  styleUrl: './event-types.component.scss'
})

export class EventTypesComponent {
  displayAddForm: boolean = false;
  displayEditForm: boolean = false;

  selectedEventType!: CreateEventTypeResponseDTO;
  public eventTypes: CreateEventTypeResponseDTO[] = [];
  public displayedEventTypes: CreateEventTypeResponseDTO[] = [];

  public first: number = 0;
  public rows: number = 3;
  public totalRecords: number = 0;

  constructor(private router: Router, private eventTypeService: EventTypeService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.eventTypeService.getAll().pipe(
      tap(response => {
        this.eventTypes = response;
        this.updateDisplayedEventTypes(); // Update the displayed data after loading
      })
    ).subscribe();
  }

  showAddForm() {
    this.displayAddForm = true;
  }

  showEditForm(et: CreateEventTypeResponseDTO) {
    this.displayEditForm = true;
    this.selectedEventType = et;
  }

  onUpdate(eventType: any): void {
    console.log('Update clicked for', eventType);
    // Implement your update logic here
  }

  onDelete(eventType: any): void {
    console.log('Delete clicked for', eventType);
    // Implement your delete logic here
  }

  updateDisplayedEventTypes() {
    const end = this.first + this.rows;
    this.displayedEventTypes = this.eventTypes.slice(this.first, end);
  }

  deactivateEventType(id: number) {
    this.eventTypeService.deactivate(id).pipe(
      tap(response => {
        this.loadData();
      })
    ).subscribe();
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.updateDisplayedEventTypes();
  }

  // Listen for updates from the edit form and reload data
  handleEventTypeDataUpdated(updated: boolean) {
    if (updated) {
      this.loadData();  // Reload the data if it was updated
    }
  }

  handleEventTypeDataCreated(updated: boolean) {
    if (updated) {
      this.loadData();  // Reload the data if it was updated
    }
  }
}
