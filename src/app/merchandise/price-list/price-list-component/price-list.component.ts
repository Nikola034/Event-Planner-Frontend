import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PriceListItemDTO } from '../model/price-list-item-dto';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PriceListService } from '../price-list.service';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { DialogModule } from 'primeng/dialog';
import { EditPriceListItemComponent } from "../edit-price-list-item/edit-price-list-item.component";
import jsPDF from 'jspdf';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-price-list',
  standalone: true,
  imports: [TableModule, CommonModule, CurrencyPipe, ButtonModule, DialogModule, EditPriceListItemComponent, ToastModule],
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.scss',
  providers: [MessageService]
})
export class PriceListComponent implements OnInit {
  priceList: PriceListItemDTO[] = [];
  displayEditForm: boolean = false;
  selectedPriceListItem!: PriceListItemDTO;

  constructor(private priceListService: PriceListService, private jwtService: JwtService, private messageService: MessageService) {}

  ngOnInit(): void {
      this.priceListService.getPriceList(this.jwtService.getIdFromToken()).subscribe({
        next: (response) => {
          this.priceList = response;
        },
        error: (err) => {
          if (err.error && err.error.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error loading Price List',
              detail: err.error.message
            });
          } else if (err.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error loading Price List',
              detail: err.message
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error loading Price List',
              detail: 'Failed to load Price List. Try refreshing page!.'
            });
          }
        }
      });
  }

  showEditForm(priceListItem: PriceListItemDTO) {
    this.selectedPriceListItem = priceListItem;
    this.displayEditForm = true;
  }

  priceListItemUpdated(updatedPriceList: PriceListItemDTO[]) {
    this.priceList = updatedPriceList;
    this.displayEditForm = false;
  }

  getPDF() {
    if(!this.priceList || this.priceList.length === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error creating PDF File',
        detail: 'Price List is empty'
      });
      return;
    }

    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text('Price List of Services and Product', 105, 10, {align: 'center'});
    pdf.setFontSize(12);

    const headers = [['Num', 'Title', 'Price', 'Discount', 'Discounted Price']];
    const data = this.priceList.map((item, index) => [
      index + 1,
      item.title,
      item.price,
      item.discount,
      item.discountedPrice
    ]);

    (pdf as any).autoTable({
      head: headers,
      body: data,
      startY: 20,
      theme: 'striped',
      styles: { fontSize: 10 }
    });

    pdf.save(`Service_provider_${this.jwtService.getIdFromToken()}_Price_list.pdf`);
  }
}
