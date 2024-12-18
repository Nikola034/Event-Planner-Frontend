import { Component } from '@angular/core';
import { MerchandiseComponent } from '../merchandise/merchandise/merchandise.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-favorite-merchandise',
  standalone: true,
  imports: [MerchandiseComponent,MapComponent],
  templateUrl: './favorite-merchandise.component.html',
  styleUrl: './favorite-merchandise.component.scss'
})
export class FavoriteMerchandiseComponent {

}
