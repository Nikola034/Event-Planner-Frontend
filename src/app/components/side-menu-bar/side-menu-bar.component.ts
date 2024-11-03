import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';


@Component({
  selector: 'app-side-menu-bar',
  standalone: true,
  imports: [AvatarModule],
  templateUrl: './side-menu-bar.component.html',
  styleUrl: './side-menu-bar.component.scss'
})
export class SideMenuBarComponent {

}
