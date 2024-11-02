import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Event } from '../event';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { AddressService } from '../../address/address.service';
import { StreetAddress } from '../../address/street-address';
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [ButtonModule,CardModule,CommonModule,PanelModule,AvatarModule,DividerModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent implements OnInit{
  @Input() event!: Event;
  public address!:Promise<StreetAddress>;
  constructor(private addressService:AddressService){

  }
  async ngOnInit() {
    this.getAddress();
  }
  private async getAddress(){
    this.address=this.addressService.getRealAddress(this.event.address);
  }
}
