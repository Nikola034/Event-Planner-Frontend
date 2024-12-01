import { Component, Input, OnInit } from '@angular/core';
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
import { EventType } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';
import { Merchandise } from '../../merchandise/merchandise';
import { MerchandiseService } from '../../merchandise/merchandise.service';
import { EventOverviewDTO } from '../event-overview-dto';

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
    PaginatorModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  public events: EventOverviewDTO[] = [];
  public displayedEvents: EventOverviewDTO[] = [];
  public sortOptions: string[] = [];
  public filterSidebarVisible = false;
  // Pagination properties
  public first: number = 0;
  public rows: number = 3;
  public totalRecords: number = 0;
  @Input() panelTitle: string = '';
  @Input() panelType: string = '';
  constructor(private eventService: EventService, private merchandiseService: MerchandiseService) { }

  async ngOnInit() {
    switch (this.panelType) {
      case 'Top':
      case 'top':
        {
          this.eventService.getTop().subscribe({
            next: (data: EventOverviewDTO[]) => {
              this.events = data;
              this.totalRecords = this.events.length;
              this.updateDisplayedEvents();
            }
          })
          break;
        }
      default: {
        this.eventService.getAll().subscribe({
          next: (data: EventOverviewDTO[]) => {
            this.events = data;
            this.totalRecords = this.events.length;
            this.updateDisplayedEvents();
          }
        });
        break;
      }
    }
  }

  updateDisplayedEvents() {
    console.log(this.events)
    const end = this.first + this.rows;
    this.displayedEvents = this.events.slice(this.first, end);
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.updateDisplayedEvents();
  }
}