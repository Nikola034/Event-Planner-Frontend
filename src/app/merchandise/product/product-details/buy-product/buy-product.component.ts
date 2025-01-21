import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { DropdownModule } from 'primeng/dropdown';
import { Button, ButtonModule } from 'primeng/button';
import { EventService } from '../../../../event/event.service';
import { EventOverviewDTO } from '../../../../event/model/event-overview-dto';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-buy-product',
  standalone: true,
  imports: [DropdownModule, ButtonModule, ToastModule],
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.scss',
  providers: [MessageService]
})
export class BuyProductComponent implements OnInit {
  @Input() productId!: number;
  @Output() productBought = new EventEmitter<{success: boolean, message: string}>();
  eventId: number = -1;
  events: EventOverviewDTO[] = [];

  constructor(private productService: ProductService, private eventService: EventService, private messageService: MessageService) {}

  ngOnInit() {
      this.eventService.getByEo(1).subscribe({
        next: (response) => {
          this.events = response;
        },
        error: (err) => {
          if (err.error && err.error.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed to load events',
              detail: err.error.message
            });
          } else if (err.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed to load events',
              detail: err.message
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error loading Events',
              detail: 'Failed to load events. Please try again.'
            });
          }
        }
      });
  }

  onEventChange(event: any) {
    const selectedEventId = event.value?.id;
    this.eventId = selectedEventId;
  }

  onSubmit() {
    this.productService.buyProduct(this.productId, this.eventId).subscribe({
      next: (response) => {
        this.productBought.emit({success: true , message: response.message});
      },
      error: (err) => {
        this.productBought.emit({success: false, message: err.error.message});
      }
    });
  }
}
