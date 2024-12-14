import { Component } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { RouterLink, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CurrencyPipe } from '@angular/common';
import { Service } from '../service/service';
import { DialogModule } from 'primeng/dialog';
import { EditServiceFormComponent } from "../edit-service-form/edit-service-form.component";
import { AddServiceFormComponent } from "../add-service-form/add-service-form.component";
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-service-crud',
  standalone: true,
  imports: [ButtonModule, DropdownModule, RouterModule, TableModule, CurrencyPipe, DialogModule, EditServiceFormComponent, AddServiceFormComponent, CommonModule],
  templateUrl: './service-crud.component.html',
  styleUrl: './service-crud.component.scss'
})

export class ServiceCrudComponent {
  displayAddForm: boolean = false;
  showAddServiceForm() {
    this.displayAddForm = true;
  }

  selectedService!: Service;
  displayEditForm: boolean = false;
  showEditServiceForm(service: Service) {
    this.selectedService = service;
    this.displayEditForm = true;
  }

  allServices: Service[] = [
    {
      id: 1,
      title: 'Wedding Hall',
      description: "Lorem Ipsum is industry. Loretext ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      specificity: 'Beautiful wedding hall in city center',
      price: 10000,
      discount: 25,
      visible: true,
      available: true,
      minDuration: 30,
      maxDuration: 90,
      reservationDeadline: 30,
      cancelReservation: 7,
      automaticReservation: true,
      deleted: false,
      photos: [
        '/weddingHall.jpg'
      ],
      eventTypes: [
        {
          id: 1,
          title: "Wedding",
          description: "description...",
          active: true
        }
      ],
      category: {
        id: 1,
        title: "Venue",
        description: "Place where celebration happens",
        pending: false
      },
      address: {
        city: "Novi Sad",
        street: "Ulica Modene",
        number: 10,
        longitude: 72.5345,
        latitude: 2.4324234
      },
      reviews: [],
      availableTimeslots: 'no available slots'
    },
    {
      id: 1,
      title: 'Deceased trasportation',
      description: "Lorem Ipsum is simply dummy the release of Letraset sheets containing Lorem Is PageMaker including versions of Lorem Ipsum",
      specificity: 'We drive the deceased to its final location',
      price: 600,
      discount: 15,
      visible: true,
      available: true,
      minDuration: 60,
      maxDuration: 140,
      reservationDeadline: 30,
      cancelReservation: 7,
      automaticReservation: true,
      deleted: false,
      photos: [
        '/funneralCar.jpeg'
      ],
      eventTypes: [
        {
          id: 2,
          title: "Funeral",
          description: "description...",
          active: true
        }
      ],
      category: {
        id: 2,
        title: "Transportation",
        description: "Transportation of people",
        pending: false
      },
      address: {
        city: "Novi Sad",
        street: "Ulica Modene",
        number: 10,
        longitude: 72.5345,
        latitude: 2.4324234
      },
      reviews: [],
      availableTimeslots: 'no available slots'
    },
    {
      id: 1,
      title: 'Birthday Decoration',
      description: "Lorstry. Lorem Ipsum has been the industry's standard dntially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      specificity: 'We do decorations for 18th birthdays',
      price: 500,
      discount: 0,
      visible: true,
      available: true,
      minDuration: 45,
      maxDuration: 1440,
      reservationDeadline: 30,
      cancelReservation: 7,
      automaticReservation: true,
      deleted: false,
      photos: [
        '/decorations.jpg'
      ],
      eventTypes: [
        {
          id: 1,
          title: "Wedding",
          description: "description...",
          active: true
        },
        {
          id: 3,
          title: "Birthday",
          description: "description...",
          active: true
        }
      ],
      category: {
        id: 3,
        title: "Decorations",
        description: "Making something that deocrates events",
        pending: false
      },
      address: {
        city: "Novi Sad",
        street: "Ulica Modene",
        number: 10,
        longitude: 72.5345,
        latitude: 2.4324234
      },
      reviews: [],
      availableTimeslots: 'no available slots'
    },
    {
      id: 1,
      title: 'Catering',
      description: "Lorem Ipsum is sim's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      specificity: 'Beautiful wedding hall in city center',
      price: 10000,
      discount: 30,
      visible: true,
      available: true,
      minDuration: 30,
      maxDuration: 90,
      reservationDeadline: 30,
      cancelReservation: 7,
      automaticReservation: true,
      deleted: false,
      photos: [
        '/dinja.jpg'
      ],
      eventTypes: [
        {
          id: 1,
          title: "Wedding",
          description: "description...",
          active: true
        },
        {
          id: 2,
          title: "Funeral",
          description: "description...",
          active: true
        },
        {
          id: 3,
          title: "Birthday",
          description: "description...",
          active: true
        },
        {
          id: 4,
          title: "Conference",
          description: "description...",
          active: true
        }
      ],
      category: {
        id: 1,
        title: "Food",
        description: "Place where celebration happens",
        pending: false
      },
      address: {
        city: "Novi Sad",
        street: "Ulica Modene",
        number: 10,
        longitude: 72.5345,
        latitude: 2.4324234
      },
      reviews: [],
      availableTimeslots: 'no available slots'
    },
    {
      id: 1,
      title: 'Wedding Hall',
      description: "Lorem Ipsum is simply dummnd typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      specificity: 'Beautiful wedding hall in city center',
      price: 10000,
      discount: 5,
      visible: true,
      available: false,
      minDuration: 30,
      maxDuration: 90,
      reservationDeadline: 30,
      cancelReservation: 7,
      automaticReservation: true,
      deleted: false,
      photos: [
        '/weddingHall.jpg'
      ],
      eventTypes: [
        {
          id: 1,
          title: "Wedding",
          description: "description...",
          active: true
        }
      ],
      category: {
        id: 1,
        title: "Venue",
        description: "Place where celebration happens",
        pending: false
      },
      address: {
        city: "Novi Sad",
        street: "Ulica Modene",
        number: 10,
        longitude: 72.5345,
        latitude: 2.4324234
      },
      reviews: [],
      availableTimeslots: 'no available slots'
    },
    {
      id: 1,
      title: 'Wedding Hall',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      specificity: 'Beautiful wedding hall in city center',
      price: 10000,
      discount: 0,
      visible: true,
      available: false,
      minDuration: 30,
      maxDuration: 90,
      reservationDeadline: 30,
      cancelReservation: 7,
      automaticReservation: true,
      deleted: false,
      photos: [
        '/weddingHall.jpg'
      ],
      eventTypes: [
        {
          id: 1,
          title: "Wedding",
          description: "description...",
          active: true
        }
      ],
      category: {
        id: 1,
        title: "Venue",
        description: "Place where celebration happens",
        pending: false
      },
      address: {
        city: "Novi Sad",
        street: "Ulica Modene",
        number: 10,
        longitude: 72.5345,
        latitude: 2.4324234
      },
      reviews: [],
      availableTimeslots: 'no available slots'
    },
    {
      id: 1,
      title: 'Wedding Hall',
      description: "Lorem Ipsum ismy text ever since e spee 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      specificity: 'Beautiful wedding hall in city center',
      price: 10000,
      discount: 0,
      visible: true,
      available: true,
      minDuration: 30,
      maxDuration: 90,
      reservationDeadline: 30,
      cancelReservation: 7,
      automaticReservation: true,
      deleted: false,
      photos: [
        '/weddingHall.jpg'
      ],
      eventTypes: [
        {
          id: 1,
          title: "Wedding",
          description: "description...",
          active: true
        }
      ],
      category: {
        id: 1,
        title: "Venue",
        description: "Place where celebration happens",
        pending: false
      },
      address: {
        city: "Novi Sad",
        street: "Ulica Modene",
        number: 10,
        longitude: 72.5345,
        latitude: 2.4324234
      },
      reviews: [],
      availableTimeslots: 'no available slots'
    }
  ]
}
