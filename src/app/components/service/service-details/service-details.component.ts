import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [ButtonModule,ReservationDialogComponent,FloatLabelModule,InputTextModule],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.scss'
})
export class ServiceDetailsComponent {
  @ViewChild(ReservationDialogComponent)
  reservationDialog!: ReservationDialogComponent;
  serviceId:number=4;

  openReservationDialog() {
    this.reservationDialog.openDialog();
  }
}
