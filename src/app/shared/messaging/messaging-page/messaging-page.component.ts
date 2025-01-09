import { Component } from '@angular/core';
import { MessengerComponent } from "../messenger/messenger.component";

@Component({
  selector: 'app-messaging-page',
  standalone: true,
  imports: [MessengerComponent],
  templateUrl: './messaging-page.component.html',
  styleUrl: './messaging-page.component.scss'
})
export class MessagingPageComponent {

}
