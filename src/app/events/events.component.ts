import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { Event } from '../event';
import { EventService } from '../event.service';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from '../event-card/event-card.component';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TableModule } from 'primeng/table';
import { EventsFilterComponent } from '../events-filter/events-filter.component';
import { EventType } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    PanelModule,
    CommonModule,
    EventCardComponent,
    DividerModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DropdownModule,
    FloatLabelModule,
    TableModule,
    SidebarModule,
    EventsFilterComponent,
    PaginatorModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  public events: Event[] = [];
  public displayedEvents: Event[] = [];
  public sortOptions: string[] = [];
  public filterSidebarVisible = false;
  
  // Pagination properties
  public first: number = 0;
  public rows: number = 3;
  public totalRecords: number = 0;
  
  constructor(private eventService: EventService) {}
  
  ngOnInit(): void {
    this.eventService.getAll().subscribe({
      next: (data: Event[]) => {
        this.events = data;
        this.totalRecords = this.events.length;
        this.updateDisplayedEvents();
      }
    });
    this.sortOptions = this.eventService.SortOptions;
  }
  
  updateDisplayedEvents() {
    const end = this.first + this.rows;
    this.displayedEvents = this.events.slice(this.first, end);
  }
  
  onChange(event: any) {
    this.events.sort((n1: any, n2: any) => {
      if (event.value === 'type') {
        return n1[event.value].title.localeCompare(n2[event.value].title);
      }
      else if(event.value === 'city'){
        return n1.address.city.localeCompare(n2.address.city);
      }
      else {
        return n1[event.value] > n2[event.value] ? 1 : (n1[event.value] < n2[event.value] ? -1 : 0)
      }
    });
    // Reset to first page after sorting
    this.first = 0;
    this.updateDisplayedEvents();
  }
  
  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.updateDisplayedEvents();
  }
}