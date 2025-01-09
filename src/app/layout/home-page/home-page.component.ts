import { Component, OnInit } from '@angular/core';
import { EventsComponent } from "../../event/events-component/events.component";
import { MerchandiseComponent } from "../../merchandise/merchandise/merchandise-component/merchandise.component";
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { JwtService } from '../../infrastructure/auth/jwt.service';
import { EventToken } from '../../infrastructure/auth/model/event-token';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserService } from '../../user/user.service';
import { MapComponent } from "../../shared/map/map.component";
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from '../search-page/search.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [EventsComponent, MerchandiseComponent, RouterModule, ButtonModule, ToastModule, ConfirmDialogModule, MapComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  providers: [MessageService,ConfirmationService]
})
export class HomePageComponent implements OnInit {
  constructor(private jwtService: JwtService, private messageService: MessageService,private confirmationService: ConfirmationService,private userService:UserService,private fb: FormBuilder,private searchService:SearchService) {
    this.filterForm = this.fb.group({
      showEvents: [true],
      showServices: [true],
      showProducts: [true],
      events: this.fb.group({
        eventDate: [''],
        type: [''],
        city: ['']
      }),
      services: this.fb.group({
        priceMin: [''],
        priceMax: [''],
        category: [''],
        durationMin: [''],
        durationMax: [''],
        city: ['']
      }),
      products: this.fb.group({
        priceMin: [''],
        priceMax: [''],
        category: [''],
        durationMin: [''],
        durationMax: [''],
        city: ['']
      })
    });
   }
  eventToken: string  = "";
  decodedEventToken:any="";
  filterForm: FormGroup;
  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      if(!this.jwtService.isInviteTokenValid())return;
      this.eventToken = this.jwtService.getEventToken() ?? "";
      this.decodedEventToken=this.jwtService.decodeToken(this.eventToken);
      const userId=this.jwtService.getIdFromToken();
      this.userService.followEvent(this.decodedEventToken.id).subscribe({
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

  resetSearchParameters(){
    this.searchService.updateFilters(this.filterForm.value);
    this.searchService.updateSearch("");
  }


}
