import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { MerchandiseCardComponent } from '../merchandise-card/merchandise-card.component';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TableModule } from 'primeng/table';
import { EventType } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';
import { Merchandise } from '../../merchandise/merchandise';
import { MerchandiseService } from '../../merchandise/merchandise.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-merchandise',
  standalone: true,
  imports: [ CardModule,
    ButtonModule,
    PanelModule,
    CommonModule,
    MerchandiseCardComponent,
    DividerModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DropdownModule,
    FloatLabelModule,
    TableModule,
    SidebarModule,
    PaginatorModule],
  templateUrl: './merchandise.component.html',
  styleUrl: './merchandise.component.scss'
})
export class MerchandiseComponent {
  public merchandise: Merchandise[] = [];
  public displayedMerchandise: Merchandise[] = [];
  public filterSidebarVisible = false;
  // Pagination properties
  public first: number = 0;
  public rows: number = 3;
  public totalRecords: number = 0;
  @Input() panelTitle:string='';
  
  constructor(private merchandiseService:MerchandiseService) {}
  
  ngOnInit(): void {
    this.merchandiseService.getAll().subscribe({
      next: (data: Merchandise[]) => {
        this.merchandise = data;
        this.totalRecords = this.merchandise.length;
        this.updateDisplayedEvents();
      }
    });
  }
  
  updateDisplayedEvents() {
    const end = this.first + this.rows;
    this.displayedMerchandise = this.merchandise.slice(this.first, end);
  }
  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.updateDisplayedEvents();
  }
  
}
