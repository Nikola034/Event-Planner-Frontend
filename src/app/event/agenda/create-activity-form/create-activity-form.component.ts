import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { EventService } from '../../event.service';
import { CreateActivityDTO } from '../agenda-component/activity-overview.dto';
import { response } from 'express';
import { tap } from 'rxjs';
import { MapComponent } from '../../../shared/map/map.component';
import { AddressDTO } from '../../../infrastructure/auth/model/register-dtos/address.dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-activity-form',
  standalone: true,
  imports: [DropdownModule, FormsModule, MultiSelectModule, RadioButtonModule, ButtonModule, ReactiveFormsModule, CalendarModule,MapComponent],
  templateUrl: './create-activity-form.component.html',
  styleUrl: './create-activity-form.component.scss'
})
export class CreateActivityFormComponent {
  addActivityForm = new FormGroup({
    title: new FormControl<string | null>(''),
    description: new FormControl(''),
    start: new FormControl<Date | null>(new Date()),
    end: new FormControl<Date | null>(new Date()),
    city: new FormControl(''),
    street: new FormControl(''),
    number: new FormControl<string | null | undefined>(''),
    latitude: new FormControl<number | null | undefined>(1),
    longitude: new FormControl<number | null | undefined>(1),
  });

  constructor(private router: Router, private fb: FormBuilder, private eventService: EventService, private route: ActivatedRoute) {

  }

  createActivity(){
    const id = this.route.snapshot.paramMap.get('id');
    const eventId = id ? Number(id) : -1;

    const dto: CreateActivityDTO = {
      title: this.addActivityForm.controls.title.value,
      description: this.addActivityForm.controls.description.value,
      startTime: this.addActivityForm.controls.start.value,
      endTime: this.addActivityForm.controls.end.value,
      address: {
        city: this.addActivityForm.controls.city.value,
      street: this.addActivityForm.controls.street.value,
      number: this.addActivityForm.controls.number.value,
      latitude: this.addActivityForm.controls.latitude.value,
      longitude: this.addActivityForm.controls.longitude.value,
      }
    }
    this.eventService.addActivity(eventId, dto).pipe(tap(response => {
        this.router.navigate(['home/agenda', eventId]);
    })).subscribe()
  }
  onAddressSelected(address: AddressDTO) {
      this.addActivityForm.patchValue({
        city: address.city,
        street: address.street,
        number: address.number,
        latitude:address.latitude,
        longitude:address.longitude
      });
    }
}
