import { Component } from '@angular/core';
import { MerchandiseComponent } from '../merchandise/merchandise/merchandise.component';

@Component({
  selector: 'app-favorite-merchandise',
  standalone: true,
  imports: [MerchandiseComponent],
  templateUrl: './favorite-merchandise.component.html',
  styleUrl: './favorite-merchandise.component.scss'
})
export class FavoriteMerchandiseComponent {

}
