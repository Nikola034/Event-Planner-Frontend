import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import {
  ActivityOverviewDTO,
  CreateActivityDTO,
} from '../agenda/activity-overview.dto';
import { EventService } from '../event/event.service';
import { tap } from 'rxjs';
import { MapComponent } from '../map/map.component';
import { AddressDTO } from '../auth/register-dtos/address.dto';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-activity-form',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    MultiSelectModule,
    RadioButtonModule,
    MapComponent,
    ButtonModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  templateUrl: './edit-activity-form.component.html',
  styleUrl: './edit-activity-form.component.scss',
})
export class EditActivityFormComponent {
  activityId!: number;

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
  onAddressSelected(address: AddressDTO) {
    this.addActivityForm.patchValue({
      city: address.city,
      street: address.street,
      number: address.number,
      latitude: address.latitude,
      longitude: address.longitude,
    });
  }

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('activityId');
    this.activityId = id ? Number(id) : -1;

    this.eventService
      .getActivity(this.activityId)
      .pipe(
        tap((response) => {
          this.addActivityForm.patchValue({
            title: response.title,
            description: response.description,
            start: response.startTime,
            end: response.endTime,
            city: response.address?.city,
            street: response.address?.street,
            number: response.address?.number,
            latitude: response.address?.latitude,
            longitude: response.address?.longitude,
          });
        })
      )
      .subscribe();
  }

  createActivity() {
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
      },
    };
    this.eventService
      .updateActivity(this.activityId, dto)
      .pipe(
        tap((response) => {
          this.location.back()
        })
      )
      .subscribe();
  }
}
