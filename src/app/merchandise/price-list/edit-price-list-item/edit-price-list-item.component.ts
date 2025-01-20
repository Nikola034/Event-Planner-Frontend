import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PriceListItemDTO } from '../model/price-list-item-dto';
import { PriceListService } from '../price-list.service';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { UpdatePriceListItemDTO } from '../model/update-price-list-item-dto';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-price-list-item',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, ToastModule],
  templateUrl: './edit-price-list-item.component.html',
  styleUrl: './edit-price-list-item.component.scss',
  providers: [MessageService]
})
export class EditPriceListItemComponent {
  editPriceListItem!: FormGroup;
  @Input() priceListItem!: PriceListItemDTO;
  @Output() priceListItemUpdated = new EventEmitter<PriceListItemDTO[]>;
  constructor(private fb: FormBuilder, private priceListService: PriceListService, private jwtService: JwtService, private messageService: MessageService) {
    this.editPriceListItem = this.fb.group({
      price: [null],
      discount: [null]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['priceListItem'] && changes['priceListItem'].currentValue) {
      const data = changes['priceListItem'].currentValue;
      this.editPriceListItem.patchValue({
        price: this.priceListItem.price || null,
        discount: this.priceListItem.discount || null
      });
    }
  }

  isFormValid() {
    if(this.editPriceListItem.value.price === null ||
       this.editPriceListItem.value.price < 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Form field invalid',
          detail: 'Price cannot bbe less than 0'
        });  
        return false;
    }
    else if(this.editPriceListItem.value.discount === null ||
            this.editPriceListItem.value.discount < 0 ||
            this.editPriceListItem.value.discount > 100) {
              this.messageService.add({
                severity: 'error',
                summary: 'Form field invalid',
                detail: 'Discount can only be number in range 0-100'
              });
              return false;
            }
    return true;
  }

  onSubmit() {
    if(this.isFormValid()) {
      const request: UpdatePriceListItemDTO = {
        ...this.editPriceListItem.value
      }
      this.priceListService.updatePriceListItem(this.jwtService.getIdFromToken(), this.priceListItem.merchandiseId, request).subscribe({
        next: (response) => {
          this.priceListItemUpdated.emit(response);
        },
        error: (err) => {
          if (err.error && err.error.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error updating Price List',
              detail: err.error.message
            });
          } else if (err.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error updating Price List',
              detail: err.message
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error updating Price List',
              detail: 'Failed to update Price List. Please try again.'
            });
          }
        }
      });
    }
  }
}
