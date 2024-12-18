import { Component } from '@angular/core';
import { EventsComponent } from '../event/events/events.component';
import { EventCalendarComponent } from '../event-calendar/event-calendar.component';
import { MapComponent } from '../map/map.component';


@Component({
  selector: 'app-followed-events',
  standalone: true,
  imports: [EventsComponent,EventCalendarComponent,MapComponent
  ],
  templateUrl: './followed-events.component.html',
  styleUrl: './followed-events.component.scss',
  
})
export class FollowedEventsComponent  {
  
}