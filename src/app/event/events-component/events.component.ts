import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { EventService } from '../event.service';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from '../event-card/event-card.component';
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
import { Merchandise } from '../../merchandise/merchandise/model/merchandise';
import { MerchandiseService } from '../../merchandise/merchandise/merchandise.service';
import { EventOverviewDTO } from '../model/event-overview-dto';
import { EventFilters } from '../model/event-filters';
import { SearchService } from '../../layout/search-page/search.service';
import { combineLatest, debounceTime, distinctUntilChanged } from 'rxjs';
import { MapService } from '../../shared/map/map.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    PanelModule,
    CommonModule,
    EventCardComponent,
    DividerModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DropdownModule,
    FloatLabelModule,
    TableModule,
    SidebarModule,
    PaginatorModule,
    ProgressSpinnerModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  public events: EventOverviewDTO[] = [];
  public displayedEvents: EventOverviewDTO[] = [];
  public sortOptions: string[] = [];
  public filterSidebarVisible = false;
  searchValue: string = '';
  filterValues: EventFilters | null = null;
  eventSort: string = 'date';
  // Pagination properties
  public first: number = 0;
  public rows: number = 3;
  public totalRecords: number = 0;
  @Input() panelTitle: string = '';
  @Input() panelType: string = '';
  public loading: boolean = false;
  constructor(private eventService: EventService, private searchService: SearchService,private mapService:MapService) { }

  async ngOnInit() {
    switch (this.panelType) {
      case 'Top':
      case 'top':
        {
          this.loading = true;
          this.eventService.getTop().subscribe({
            next: (data: EventOverviewDTO[]) => {
              this.events = data;
              this.totalRecords = this.events.length;
              this.mapService.updateEventAddresses(data);
              this.updateDisplayedEvents();
            },
            error: (error) => {
              console.error('Error loading events:', error);
            },
            complete: () => {
              this.loading = false;
            }
          });
          break;
        }
      case "Search":
      case "search": {
        if (typeof window !== 'undefined' && window.localStorage) {
        combineLatest([
          this.searchService.search$,
          this.searchService.eventFilters$,
          this.searchService.eventSort$
        ]).pipe(
          distinctUntilChanged(),
          debounceTime(300)
        ).subscribe({
          next: ([searchValue, eventFilters, eventSort]) => {
            this.searchValue = searchValue;
            this.filterValues = eventFilters;
            this.eventSort = eventSort;
            this.triggerEventSearch();
          }
        });
      }
        break;
      }
      case "followed":
      case "Followed":
        {
          this.loading = true;
          if (typeof window !== 'undefined' && window.localStorage) {
            this.eventService.getFollowed().subscribe({
              next: (data: EventOverviewDTO[]) => {
                this.events = data;
                this.totalRecords = this.events.length;
                this.mapService.updateEventAddresses(data);
                this.updateDisplayedEvents();
              },
              error: (error) => {
                console.error('Error loading events:', error);
              },
              complete: () => {
                this.loading = false;
              }
            });
          }
          break;
        }
        case "favorite":
          case "Favorite":
            {
              this.loading = true;
              if (typeof window !== 'undefined' && window.localStorage) {
                this.eventService.getFavorites().subscribe({
                  next: (data: EventOverviewDTO[]) => {
                    this.events = data;
                    this.totalRecords = this.events.length;
                    this.mapService.updateEventAddresses(data);
                    this.updateDisplayedEvents();
                  },
                  error: (error) => {
                    console.error('Error loading events:', error);
                  },
                  complete: () => {
                    this.loading = false;
                  }
                });
              }
              break;
            }
    }

  }

  updateDisplayedEvents() {
    const end = this.first + this.rows;
    this.displayedEvents = this.events.slice(this.first, end);
  }


  triggerEventSearch() {
    this.loading = true;
    this.eventService.search(this.filterValues, this.searchValue, this.eventSort).subscribe({
      next: (data: EventOverviewDTO[]) => {
        this.events = data;
        this.totalRecords = this.events.length;
        this.mapService.updateEventAddresses(data);
        this.updateDisplayedEvents();
      },
      error: (error) => {
        console.error('Error searching events:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }



  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.updateDisplayedEvents();
  }
}
