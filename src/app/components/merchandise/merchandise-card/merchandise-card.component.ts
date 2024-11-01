import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Merchandise } from '../merchandise';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-merchandise-card',
  standalone: true,
  imports: [ButtonModule,CardModule,CommonModule,PanelModule,AvatarModule,DividerModule],
  templateUrl: './merchandise-card.component.html',
  styleUrl: './merchandise-card.component.scss'
})
export class MerchandiseCardComponent {
  @Input() merchandise!: Merchandise;
}
