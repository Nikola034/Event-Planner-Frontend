import { Component } from '@angular/core';
import { MerchandiseComponent } from '../merchandise-component/merchandise.component';
import { MapComponent } from '../../../shared/map/map.component';

@Component({
  selector: 'app-favorite-merchandise',
  standalone: true,
  imports: [MerchandiseComponent,MapComponent],
  templateUrl: './favorite-merchandise.component.html',
  styleUrl: './favorite-merchandise.component.scss'
})
export class FavoriteMerchandiseComponent {

}
