import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Merchandise } from '../merchandise';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { MerchandiseService } from '../merchandise.service';
import { AddressService } from '../../address/address.service';
import { StreetAddress } from '../../address/street-address';

@Component({
  selector: 'app-merchandise-card',
  standalone: true,
  imports: [ButtonModule,CardModule,CommonModule,PanelModule,AvatarModule,DividerModule],
  templateUrl: './merchandise-card.component.html',
  styleUrl: './merchandise-card.component.scss'
})
export class MerchandiseCardComponent implements OnInit{
  @Input() merchandise!: Merchandise;
  public merchandiseType!:string;
  @Input() event!: Event;
  public address!:Promise<StreetAddress>;
  constructor(private merchandiseService:MerchandiseService,private addressService:AddressService){
    
  }
  async ngOnInit() {
    this.merchandiseType=this.merchandiseService.getType(this.merchandise);
    this.getAddress();
  }
  private async getAddress(){
    this.address=this.addressService.getRealAddress(this.merchandise.address);
  }

}
