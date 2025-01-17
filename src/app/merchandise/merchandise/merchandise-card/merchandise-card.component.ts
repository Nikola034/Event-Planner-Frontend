import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Merchandise } from '../model/merchandise';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { MerchandiseService } from '../merchandise.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { MerchandiseOverviewDTO } from '../model/merchandise-overview-dto';
import { Router } from '@angular/router';
import { PhotoService } from '../../../shared/photos/photo.service';
@Component({
  selector: 'app-merchandise-card',
  standalone: true,
  imports: [ButtonModule,CardModule,CommonModule,PanelModule,AvatarModule,DividerModule,RatingModule,FormsModule],
  templateUrl: './merchandise-card.component.html',
  styleUrl: './merchandise-card.component.scss'
})
export class MerchandiseCardComponent{
  @Input() merchandise!: MerchandiseOverviewDTO;
  @Input() eventId: number = -1;
  constructor(private router:Router, private photoService: PhotoService){}

  seeDetails(){
    if(this.merchandise.type==='Service')
      this.router.navigate(['home','service',this.merchandise.id]);
    else {
      this.router.navigate(['home', 'product', this.merchandise.id, this.eventId]);
    }
  }

  getPhotoUrl(){
    if(!this.merchandise.photos || this.merchandise.photos.length == 0){
      return;
    }
    return this.photoService.getPhotoUrl(this.merchandise.photos[0].photo);
  }

}
