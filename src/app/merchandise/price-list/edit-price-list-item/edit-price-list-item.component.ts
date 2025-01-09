import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PriceListItemDTO } from '../model/price-list-item-dto';
import { PriceListService } from '../price-list.service';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { UpdatePriceListItemDTO } from '../model/update-price-list-item-dto';
import { response } from 'express';

@Component({
  selector: 'app-edit-price-list-item',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './edit-price-list-item.component.html',
  styleUrl: './edit-price-list-item.component.scss'
})
export class EditPriceListItemComponent {
  editPriceListItem!: FormGroup;
  @Input() priceListItem!: PriceListItemDTO;
  @Output() priceListItemUpdated = new EventEmitter<PriceListItemDTO[]>;
  constructor(private fb: FormBuilder, private priceListService: PriceListService, private jwtService: JwtService) {
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
      return false;
    }
    else if(this.editPriceListItem.value.discount === null ||
            this.editPriceListItem.value.discount < 0 ||
            this.editPriceListItem.value.discount > 100) {
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
          console.error(err);
        }
      });
    }
    else {
      console.log("Form not valid");
    }
  }
}
