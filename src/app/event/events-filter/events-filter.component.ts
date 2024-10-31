import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-events-filter',
  standalone: true,
  imports: [CalendarModule,FormsModule,InputTextModule,ToggleButtonModule],
  templateUrl: './events-filter.component.html',
  styleUrl: './events-filter.component.scss'
})
export class EventsFilterComponent {
  public nesto='asdas';
  public rangeDates: Date[] | undefined;
  public type:string="";
  public city:string="";
  public isPublic:boolean=true;
  filter(){
    
  }
}
