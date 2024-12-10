import { Component, EventEmitter, Input, input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormControl, FormControlName, FormGroup, FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { Service } from '../service';
import { CreateServiceResponse } from '../create-response';
import { UpdateRequest } from '../update-request';
import { Address } from '../../address/address';
import { ServiceService } from '../service.service';
import { EventType } from '../../event/event-type';
import { CreateMerchandisePhotoDTO } from '../../merchandise/merchandise-photos-request-dto';

@Component({
  selector: 'app-edit-service-form',
  standalone: true,
  imports: [DropdownModule, FormsModule, MultiSelectModule, RadioButtonModule, ButtonModule, ReactiveFormsModule, CheckboxModule],
  templateUrl: './edit-service-form.component.html',
  styleUrl: './edit-service-form.component.scss'
})
export class EditServiceFormComponent implements OnChanges {
  @Input() serviceData!: Service; 
  @Output() serviceUpdated = new EventEmitter<CreateServiceResponse>();
  editServiceForm: FormGroup; //Deklaracija forme

  constructor(private serviceService: ServiceService) { //inicijalizacija prazne forme
    this.editServiceForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      specificity: new FormControl(''),
      price: new FormControl(null),
      discount: new FormControl(null),
      category: new FormControl(null),
      eventTypesIds: new FormControl([]),
      minDuration: new FormControl(null),
      maxDuration: new FormControl(null),
      reservationDeadline: new FormControl(null),
      cancellationDeadline: new FormControl(null),
      automaticReservation: new FormControl(null),
      photos: new FormControl([]),
      visible: new FormControl(false),
      available: new FormControl(false)
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['serviceData'] && changes['serviceData'].currentValue) {
      const data = changes['serviceData'].currentValue;

      const etIds = data.eventTypes ? data.eventTypes.map((et: any) => et.id) : [];
      this.editServiceForm.patchValue({
        title: data.title || '',
        description: data.description || '',
        specificity: data.specificity || '',
        price: data.price || 0,
        discount: data.discount || 0,
        category: data.category.title || null,
        eventTypesIds: etIds || [],
        minDuration: data.minDuration || 0,
        maxDuration: data.maxDuration || 0,
        reservationDeadline: data.reservationDeadline || 0,
        cancellationDeadline: data.cancellationDeadline || 0,
        automaticReservation: data.automaticReservation ? 'true' : 'false',
        photos: data.photos || [],
        visible: data.visible || false,
        available: data.available || false
      })
    }
  }
  
  allEventTypes: EventType[] = [
    {
      id: 1,
      title: 'wedding',
      description: 'weddings',
      active: true
    },
    {
      id: 2,
      title: 'funeral',
      description: 'funeral',
      active: true
    },
    {
      id: 3,
      title: 'birthday',
      description: 'birthday',
      active: true
    },
    {
      id: 4,
      title: 'conference',
      description: 'conference',
      active: true
    }
  ];

  onEventTypesChange(event: any) {
    const selectedIds = event.value.map((item: EventType) => item.id);
    this.editServiceForm.patchValue({ eventTypesIds: selectedIds });
  }

  onSubmit() {
    const address: Address = {
      city: 'city',
      street: 'street',
      number: 10,
      longitude: 72.5345,
      latitude: 2.4324234
    }
    if(this.editServiceForm.valid) {
      const updatedService: UpdateRequest = {
        ...this.editServiceForm.value,
        address: address,
        serviceProviderId: 2
      }
      console.log(updatedService.serviceProviderId);
      this.serviceService.update(this.serviceData.id, updatedService).subscribe({
        next: (response) => {
          this.serviceUpdated.emit(response);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  uploadFile($event: any) {
    const files = $event.target.files as File[];
    if (files && files.length > 0) {
      const fileArray: CreateMerchandisePhotoDTO[] = [];
      const readers: Promise<void>[] = [];
  
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        const promise = new Promise<void>((resolve, reject) => {
          reader.onload = () => {
            const str = reader.result as string;
            const merchandisePhoto: CreateMerchandisePhotoDTO = {
              photo: str
            }
            fileArray.push(merchandisePhoto);
            resolve();
          };
          reader.onerror = reject;
        });
        readers.push(promise);
        reader.readAsDataURL(file);
      });
  
      Promise.all(readers).then(() => {
        this.editServiceForm.patchValue({ merchandisePhotos: fileArray });
      }).catch((error) => {
        console.error('Error reading files:', error);
      });
    }
  }
}
