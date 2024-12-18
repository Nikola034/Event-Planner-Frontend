import { Component } from '@angular/core';
import { EventsComponent } from "../event/events/events.component";
import { MerchandiseComponent } from "../merchandise/merchandise/merchandise.component";
import { SearchHeaderComponent } from "./search-header/search-header.component";
import { MapComponent } from "../map/map.component";


@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [EventsComponent, MerchandiseComponent, SearchHeaderComponent, SearchHeaderComponent, MapComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
}
