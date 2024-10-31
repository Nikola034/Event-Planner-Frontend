import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Event } from '../event';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [ButtonModule,CardModule,CommonModule,PanelModule,AvatarModule,DividerModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  @Input() event!: Event;
}
