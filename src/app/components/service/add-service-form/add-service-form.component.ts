import { Component, input, OnInit, Output, EventEmitter } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateRequest } from '../create-request';
import { Address } from '../../address/address';
import { ServiceService } from '../service.service';
import { Service } from '../service';
import { CreateServiceResponse } from '../create-response';
import { Category } from '../../category/category';
import { EventType } from '../../event/event-type';
import { resolve } from 'path';
import { MerchandisePhotoDTO } from '../../merchandise/merchandise-photo-response-dto';
import { CreateMerchandisePhotoDTO } from '../../merchandise/merchandise-photos-request-dto';

@Component({
  selector: 'app-add-service-form',
  standalone: true,
  imports: [DropdownModule, FormsModule, MultiSelectModule, RadioButtonModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './add-service-form.component.html',
  styleUrl: './add-service-form.component.scss'
})
export class AddServiceFormComponent implements OnInit {
  addServiceForm!: FormGroup;
  @Output() serviceCreated = new EventEmitter<CreateServiceResponse>();
  allCategories: Category[] = [
    {
      id: 1,
      title: 'vanue',
      description: 'category1',
      pending: false
    },
    {
      id: 2,
      title: 'food',
      description: 'category2',
      pending: false
    },
    {
      id: 3,
      title: 'drinks',
      description: 'category3',
      pending: false
    },
    {
      id: 4,
      title: 'decorations',
      description: 'category4',
      pending: false
    },
    {
      id: 5,
      title: 'transportation',
      description: 'category5',
      pending: false
    }
  ];

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

  constructor(private fb: FormBuilder, private serviceService: ServiceService) {}
  ngOnInit(): void {
    this.addServiceForm = this.fb.group({
      title: [''],
      description: [''],
      specificity: [''],
      price: [null],
      discount: [null],
      categoryId: [-1],
      category: [null],
      eventTypesIds: [[]],
      minDuration: [null],
      maxDuration: [null],
      reservationDeadline: [null],
      cancellationDeadline: [null],
      automaticReservation: [null],
      merchandisePhotos: [[]],
    });
  }

  onCategoryChange(event: any) {
    const selectedCategoryId = event.value?.id;
    this.addServiceForm.patchValue({categoryId: selectedCategoryId});
  }

  onEventTypesChange(event: any) {
    const selectedIds = event.value.map((item: EventType) => item.id);
    this.addServiceForm.patchValue({ eventTypesIds: selectedIds});
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
        this.addServiceForm.patchValue({ merchandisePhotos: fileArray });
      }).catch((error) => {
        console.error('Error reading files:', error);
      });
    }
  }

  submit() {
    const address: Address = {
      city: 'city',
      street: 'street',
      number: 10,
      longitude: 72.5345,
      latitude: 2.4324234
    }

    if(this.addServiceForm.valid) {
      const newService: CreateRequest = {
        ...this.addServiceForm.value,
        address: address,
        serviceProviderId: 2
      };
      this.serviceService.create(newService).subscribe({
        next: (response) => {
          this.serviceCreated.emit(response);
          this.addServiceForm.reset();
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}
