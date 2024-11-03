import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Merchandise } from '../merchandise';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { MerchandiseService } from '../merchandise.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-merchandise-card',
  standalone: true,
  imports: [ButtonModule,CardModule,CommonModule,PanelModule,AvatarModule,DividerModule,RatingModule,FormsModule],
  templateUrl: './merchandise-card.component.html',
  styleUrl: './merchandise-card.component.scss'
})
export class MerchandiseCardComponent implements OnInit{
  @Input() merchandise!: Merchandise;
  public merchandiseType!:string;
  public rating!:number;
  constructor(private merchandiseService:MerchandiseService){
  }
  ngOnInit():void {
    this.merchandiseType=this.merchandiseService.getType(this.merchandise);
    this.rating=this.merchandiseService.getRating(this.merchandise);
  }

}
