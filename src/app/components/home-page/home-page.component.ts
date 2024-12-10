import { Component, OnInit } from '@angular/core';
import { EventsComponent } from "../event/events/events.component";
import { MerchandiseComponent } from "../merchandise/merchandise/merchandise.component";
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { JwtService } from '../auth/jwt.service';
import { EventToken } from '../auth/event-token';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [EventsComponent, MerchandiseComponent, RouterModule, ButtonModule,ToastModule,ConfirmDialogModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  providers: [MessageService,ConfirmationService]
})
export class HomePageComponent implements OnInit {
  constructor(private jwtService: JwtService, private messageService: MessageService,private confirmationService: ConfirmationService,private userService:UserService) { }
  eventToken: string  = "";
  decodedEventToken:any="";
  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      if(!this.jwtService.isInviteTokenValid())return;
      this.eventToken = this.jwtService.getEventToken() ?? "";
      this.decodedEventToken=this.jwtService.decodeToken(this.eventToken);
      const userId=this.jwtService.getIdFromToken();
      this.userService.followEvent(userId, this.decodedEventToken.id).subscribe({
        next: () => {
          this.confirmationService.confirm({
            message: 'You now follow the event: ' + this.decodedEventToken.title,
            header: 'Event invite'
          });
        },
        error: (error) => {
          console.error('Error following event:', error);
        }
      });
      this.jwtService.removeEventToken();
      this.confirmationService.confirm({
        message: 'You now follow the event: '+this.decodedEventToken.title,
        header: 'Event invite'
      });
    }
  }

  

}
