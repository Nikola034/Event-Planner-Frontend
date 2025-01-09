import { Component, input, OnInit, Output, EventEmitter } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateRequest } from '../model/create-request';
import { Address } from '../../../shared/address/address';
import { ServiceService } from '../service.service';
import { CreateServiceResponse } from '../model/create-response';
import { EventType } from '../../../event-type/event-type';
import { CreateMerchandisePhotoDTO } from '../../merchandise/model/merchandise-photos-request-dto';
import { CategoryService } from '../../category/category.service';
import { CategoryDto } from '../../category/model/category.dto';

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
  allCategories: CategoryDto[] = [];
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

  constructor(private fb: FormBuilder,
              private serviceService: ServiceService,
              private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllApproved().subscribe({
      next: (response) => {
        this.allCategories = response;
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.addServiceForm = this.fb.group({
      title: [''],
      description: [''],
      specificity: [''],
      city: [''],
      street: [''],
      houseNumber: [null],
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
        const merchandisePhoto: CreateMerchandisePhotoDTO = {
          photo: file.name
        }
        fileArray.push(merchandisePhoto);

      });
      this.addServiceForm.patchValue({ merchandisePhotos: fileArray });
    }
  }

  submit() {
    const address: Address = {
      city: this.addServiceForm.value.city,
      street: this.addServiceForm.value.street,
      number: this.addServiceForm.value.houseNumber,
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
