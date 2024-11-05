import { Component } from '@angular/core';
import { EventsComponent } from "../event/events/events.component";
import { MerchandiseComponent } from "../merchandise/merchandise/merchandise.component";
import { RouterLink,RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [EventsComponent, MerchandiseComponent,RouterModule,ButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
