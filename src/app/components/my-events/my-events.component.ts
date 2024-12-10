import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { EventCardComponent } from '../event/event-card/event-card.component';
import { EventService } from '../event/event.service';
import { MerchandiseService } from '../merchandise/merchandise.service';
import { Event } from '../event/event';
import { Router } from '@angular/router';
import { EventOverviewDTO } from '../event/event-overview-dto';
import { JwtService } from '../auth/jwt.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-my-events',
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
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss'
})
export class MyEventsComponent {
  public events: EventOverviewDTO[] = [];
  public displayedEvents: EventOverviewDTO[] = [];
  public sortOptions: string[] = [];
  public filterSidebarVisible = false;
  // Pagination properties
  public first: number = 0;
  public rows: number = 3;
  public totalRecords: number = 0;
  @Input() panelTitle: string = 'My Events';
  @Input() panelType: string = '';
  constructor(private eventService: EventService, private merchandiseService: MerchandiseService, private router: Router, private jwtService: JwtService) { }

  ngOnInit() {
    switch (this.panelType) {
      default: {
        this.loadData();
        break;
      }
    }
  }

  loadData(): void{
    this.eventService.getByEo(1/*this.jwtService.getIdFromToken()*/).subscribe({
      next: (data: EventOverviewDTO[]) => {
        this.events = data;
        this.totalRecords = this.events.length;
        this.updateDisplayedEvents();
      }
    });
  }

  updateDisplayedEvents() {
    const end = this.first + this.rows;
    this.displayedEvents = this.events.slice(this.first, end);
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.updateDisplayedEvents();
  }

  showAddEventForm() {
    this.router.navigate(['home/create-event']);
  }
}
