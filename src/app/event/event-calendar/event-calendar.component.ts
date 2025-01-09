import { Component, Inject, Input, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarModule } from 'angular-calendar';
import { ButtonModule } from 'primeng/button';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventOverviewDTO } from '../model/event-overview-dto';
import { EventService } from '../event.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { addMonths, subMonths } from 'date-fns';
import { JwtDecodeOptions } from 'jwt-decode';
import { JwtService } from '../../infrastructure/auth/jwt.service';
@Component({
  selector: 'app-event-calendar',
  standalone: true,
  imports: [ButtonModule, CalendarModule, CommonModule],
  templateUrl: './event-calendar.component.html',
  styleUrl: './event-calendar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EventCalendarComponent implements OnInit {
  viewDate: Date = new Date();
  @Input() eventType: string = "";

  // Converted events for angular-calendar
  calendarEvents: CalendarEvent[] = [];
  // Your original events
  events: EventOverviewDTO[] = [];

  constructor(
    private eventService: EventService,
    private jwtService: JwtService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // Only run on browser
    switch (this.eventType) {
      case "followed":
      case "Followed": {
        if (isPlatformBrowser(this.platformId)) {
          this.eventService.getFollowed().subscribe({
            next: (data: EventOverviewDTO[]) => {
              this.events = data;
              this.calendarEvents = this.convertToCalendarEvents(data);
            }
          });
        }
        break;
      }
      case "favorite":
      case "Favorite": {
        if (isPlatformBrowser(this.platformId)) {
          this.eventService.getFavorites().subscribe({
            next: (data: EventOverviewDTO[]) => {
              this.events = data;
              this.calendarEvents = this.convertToCalendarEvents(data);
            }
          });
        }
        break;
      }
      case "my":
      case "My": {
        if (isPlatformBrowser(this.platformId)) {
          this.eventService.getByEo(this.jwtService.getIdFromToken()).subscribe({
            next: (data: EventOverviewDTO[]) => {
              this.events = data;
              this.calendarEvents = this.convertToCalendarEvents(data);
            }
          });
        }
        break;
      }
    }
  }

  // Convert EventOverviewDTO to CalendarEvent
  convertToCalendarEvents(events: EventOverviewDTO[]): CalendarEvent[] {
    return events.map(event => ({
      title: event.title,
      start: new Date(event.date), // Ensure it's a Date object

      meta: {
        id: event.id,
        type: event.type,
        address: event.address,
        description: event.description,
        isPublic: event.isPublic
      }
    }));
  }

  previousMonth() {
    this.viewDate = subMonths(this.viewDate, 1);
  }

  nextMonth() {
    this.viewDate = addMonths(this.viewDate, 1);
  }
}
