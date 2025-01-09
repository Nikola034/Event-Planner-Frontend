import { Component } from '@angular/core';
import { EventsComponent } from "../../../event/events-component/events.component";
import { MerchandiseComponent } from "../../../merchandise/merchandise/merchandise-component/merchandise.component";
import { SearchHeaderComponent } from "../search-header/search-header.component";
import { MapComponent } from "../../../shared/map/map.component";


@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [EventsComponent, MerchandiseComponent, SearchHeaderComponent, SearchHeaderComponent, MapComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
}
