import { Component } from '@angular/core';
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
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CardModule,ButtonModule,PanelModule,CommonModule,EventCardComponent,DividerModule,IconFieldModule,InputIconModule,InputTextModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  public events: Event[]=[];
  constructor(private eventService:EventService){
    this.events=eventService.getAllEvents();
  }

}
