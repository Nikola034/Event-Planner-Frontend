import { Component } from '@angular/core';
import { EventsComponent } from '../event/events/events.component';

@Component({
  selector: 'app-followed-events',
  standalone: true,
  imports: [EventsComponent],
  templateUrl: './followed-events.component.html',
  styleUrl: './followed-events.component.scss'
})
export class FollowedEventsComponent {

}
