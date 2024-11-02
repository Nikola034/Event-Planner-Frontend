import { Component } from '@angular/core';
import { EventsComponent } from "../event/events/events.component";
import { MerchandiseComponent } from "../merchandise/merchandise/merchandise.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [EventsComponent, MerchandiseComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
