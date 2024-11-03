import { Injectable } from '@angular/core';
import { Service } from './service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private services: Service[] = [
    {
      id: 1,
      title: "Signature Portrait Session",
      description: "Professional Photography Session that captures your unique personality and style",
      specificity: "2-hour photo session with expert photographer including multiple outfit changes, guidance on posing, and professional lighting setup. Perfect for individuals, couples, or small family groups wanting premium quality portraits.",
      price: 299.99,
      discount: 10,
      visible: true,
      available: true,
      minDuration: 120,
      maxDuration: 180,
      reservationDeadline: 48,
      cancelReservation: 72,
      automaticReservation: false,
      deleted: false,
      photos: [
        "/dinja.jpg"
      ],
      availableTimeslots: "Monday-Friday: 9:00-17:00",
      category: {
        id: 1,
        title: "Portrait Photography",
        description: "Professional portrait sessions for individuals and families",
        pending: false
      },
      address: {
        city: "Novi Sad",
        street: "Bulevar Oslobođenja",
        number: "76",
        latitude: "45.255115849023438",
        longitude: "19.844731241859632"
      },
      reviews: [
        {
          id: 1,
          user: {
            id: 101,

            name: "Ana",
            surname: "Petrović",
            address: {
              city: "Novi Sad",
              street: "Futoška",
              number: "12",
              latitude: "45.254789",
              longitude: "19.841234"
            },
            phoneNumber: "+381641234567",
            email: "ana.petrovic@email.com",
            password: "hashedPassword123",
            photo: "/profiles/ana.jpg",
            active: true
          },
          comment: "Amazing experience! The photographer made me feel so comfortable and the photos turned out beautifully.",
          rating: 5
        },
        {
          id: 22,
          user: {
            id: 102,

            name: "Milan",
            surname: "Jovanović",
            address: {
              city: "Subotica",
              street: "Maksima Gorkog",
              number: "28",
              latitude: "46.101234",
              longitude: "19.665432"
            },
            phoneNumber: "+381637654321",
            email: "milan.jovanovic@email.com",
            password: "hashedPassword456",
            photo: "/profiles/milan.jpg",
            active: true
          },
          comment: "Exceeded our expectations! Every important moment was captured perfectly.",
          rating: 4
        }
      ]
    },
    {
      id: 2,
      title: "Premium Wedding Collection",
      description: "Wedding Photography Package designed to capture every precious moment of your special day",
      specificity: "Full day coverage with 2 photographers including engagement session, ceremony and reception coverage, detail shots, formal portraits, candid moments, and complete digital gallery. Includes backup equipment and insurance.",
      price: 1499.99,
      discount: 0,
      visible: true,
      available: true,
      minDuration: 480,
      maxDuration: 720,
      reservationDeadline: 168,
      cancelReservation: 336,
      automaticReservation: false,
      deleted: false,
      photos: [
        "https://example.com/wedding-photo.jpg"
      ],
      availableTimeslots: "Saturday-Sunday: 8:00-22:00",
      category: {
        id: 2,
        title: "Wedding Photography",
        description: "Comprehensive wedding day photography services",
        pending: false
      },
      address: {
        city: "Subotica",
        street: "Matije Korvina",
        number: "17",
        latitude: "46.100245923847392",
        longitude: "19.667845234789123"
      },
      reviews: [
        {
          id: 2,
          user: {
            id: 102,

            name: "Milan",
            surname: "Jovanović",
            address: {
              city: "Subotica",
              street: "Maksima Gorkog",
              number: "28",
              latitude: "46.101234",
              longitude: "19.665432"
            },
            phoneNumber: "+381637654321",
            email: "milan.jovanovic@email.com",
            password: "hashedPassword456",
            photo: "/profiles/milan.jpg",
            active: true
          },
          comment: "Exceeded our expectations! Every important moment was captured perfectly.",
          rating: 5
        }
      ]
    },
    {
      id: 3,
      title: "Professional Photo Enhancement",
      description: "Expert Photo Editing Service utilizing advanced techniques and professional software",
      specificity: "Professional retouching and color correction including skin retouching, color enhancement, background cleanup, and advanced editing techniques. Suitable for both personal portraits and commercial photography.",
      price: 49.99,
      discount: 0,
      visible: true,
      available: true,
      minDuration: 60,
      maxDuration: 120,
      reservationDeadline: 24,
      cancelReservation: 48,
      automaticReservation: true,
      deleted: false,
      photos: [
        "https://example.com/editing.jpg"
      ],
      availableTimeslots: "Monday-Sunday: 9:00-18:00",
      category: {
        id: 3,
        title: "Post-Production",
        description: "Professional photo editing and enhancement services",
        pending: false
      },
      address: {
        city: "Novi Sad",
        street: "Žitni Trg",
        number: "5",
        latitude: "45.245678912345678",
        longitude: "19.851234567891234"
      },
      reviews: [
        {
          id: 3,
          user: {
            id: 103,

            name: "Marko",
            surname: "Nikolić",
            address: {
              city: "Novi Sad",
              street: "Narodnog Fronta",
              number: "45",
              latitude: "45.243210",
              longitude: "19.849876"
            },
            phoneNumber: "+381649876543",
            email: "marko.nikolic@email.com",
            password: "hashedPassword789",
            photo: "/profiles/marko.jpg",
            active: true
          },
          comment: "Quick turnaround and professional results. Very satisfied with the editing work.",
          rating: 4
        }
      ]
    },
    {
      id: 4,
      title: "Professional Studio Portraits",
      description: "Studio Portrait Session in a controlled environment with professional lighting and backdrops",
      specificity: "Professional headshots and portraits in a fully-equipped studio setting with various backdrop options, professional lighting setups, and expert guidance on posing and expressions. Ideal for business professionals, actors, and models.",
      price: 199.99,
      discount: 15,
      visible: true,
      available: true,
      minDuration: 60,
      maxDuration: 120,
      reservationDeadline: 24,
      cancelReservation: 48,
      automaticReservation: false,
      deleted: false,
      photos: [
        "https://example.com/portrait.jpg"
      ],
      availableTimeslots: "Tuesday-Saturday: 10:00-19:00",
      category: {
        id: 1,
        title: "Portrait Photography",
        description: "Professional portrait sessions for individuals and families",
        pending: false
      },
      address: {

        city: "Subotica",
        street: "Petra Drapšina",
        number: "8",
        latitude: "46.095678912345678",
        longitude: "19.673456789123456"
      },
      reviews: [
        {
          id: 4,
          user: {
            id: 104,

            name: "Jelena",
            surname: "Đorđević",
            address: {
              city: "Subotica",
              street: "Braće Radić",
              number: "15",
              latitude: "46.094567",
              longitude: "19.672345"
            },
            phoneNumber: "+381631234567",
            email: "jelena.djordjevic@email.com",
            password: "hashedPasswordABC",
            photo: "/profiles/jelena.jpg",
            active: true
          },
          comment: "Perfect for my professional headshots. The lighting was fantastic!",
          rating: 5
        }
      ]
    },
    {
      id: 5,
      title: "Corporate & Special Events Coverage",
      description: "Event Photography service specializing in professional coverage of corporate functions and private celebrations",
      specificity: "Corporate events and parties coverage including candid shots, group photos, speech and presentation coverage, and event highlight images. Includes rapid turnaround and online gallery sharing.",
      price: 599.99,
      discount: 0,
      visible: true,
      available: true,
      minDuration: 240,
      maxDuration: 480,
      reservationDeadline: 72,
      cancelReservation: 120,
      automaticReservation: false,
      deleted: false,
      photos: [
        "https://example.com/event-photo.jpg"
      ],
      availableTimeslots: "Monday-Sunday: 8:00-23:00",
      category: {
        id: 4,
        title: "Event Photography",
        description: "Professional photography for corporate and social events",
        pending: false
      },
      address: {
        
        city: "Novi Sad",
        street: "Vojvođanskih Brigada",
        number: "28",
        latitude: "45.249876543210987",
        longitude: "19.837654321098765"
      },
      reviews: [
        {
          id: 5,
          user: {
            id: 105,
            name: "Stefan",
            surname: "Pavlović",
            address: {
             
              city: "Novi Sad",
              street: "Bulevar Cara Lazara",
              number: "32",
              latitude: "45.248765",
              longitude: "19.836543"
            },
            phoneNumber: "+381647894561",
            email: "stefan.pavlovic@email.com",
            password: "hashedPasswordDEF",
            photo: "/profiles/stefan.jpg",
            active: true
          },
          comment: "Excellent coverage of our corporate event. The photos were delivered promptly.",
          rating: 5
        }
      ]
    },
    {
      id: 6,
      title: "Photography Fundamentals Workshop",
      description: "Comprehensive Photography Workshop teaching essential techniques and creative principles",
      specificity: "Learn basics of photography including camera operations, composition techniques, lighting fundamentals, and basic post-processing skills. Includes hands-on practice sessions and personalized feedback.",
      price: 149.99,
      discount: 20,
      visible: true,
      available: true,
      minDuration: 180,
      maxDuration: 240,
      reservationDeadline: 48,
      cancelReservation: 72,
      automaticReservation: false,
      deleted: false,
      photos: [
        "https://example.com/workshop.jpg"
      ],
      availableTimeslots: "Saturday: 10:00-16:00",
      category: {
        id: 5,
        title: "Education",
        description: "Photography workshops and training sessions",
        pending: false
      },
      address: {
       
        city: "Subotica",
        street: "Trg Republike",
        number: "2",
        latitude: "46.105678912345678",
        longitude: "19.659876543210987"
      },
      reviews: [
        {
          id: 6,
          user: {
            id: 106,
            name: "Nina",
            surname: "Kovačević",
            address: {
              
              city: "Subotica",
              street: "Zagrebačka",
              number: "5",
              latitude: "46.104567",
              longitude: "19.658765"
            },
            phoneNumber: "+381633216547",
            email: "nina.kovacevic@email.com",
            password: "hashedPasswordGHI",
            photo: "/profiles/nina.jpg",
            active: true
          },
          comment: "Great workshop for beginners. The instructor was very knowledgeable and patient.",
          rating: 4
        }
      ]
    },
    {
      id: 7,
      title: "Commercial Product Photography",
      description: "Professional Product Photography service designed for e-commerce and marketing materials",
      specificity: "E-commerce and catalog photography with professional lighting, multiple angles, detail shots, and white background options. Includes basic retouching and format optimization for various platforms.",
      price: 399.99,
      discount: 0,
      visible: true,
      available: true,
      minDuration: 120,
      maxDuration: 240,
      reservationDeadline: 48,
      cancelReservation: 72,
      automaticReservation: true,
      deleted: false,
      photos: [
        "https://example.com/product-photo.jpg"
      ],
      availableTimeslots: "Monday-Friday: 9:00-17:00",
      category: {
        id: 6,
        title: "Commercial Photography",
        description: "Professional photography for business and commercial use",
        pending: false
      },
      address: {
        city: "Novi Sad",
        street: "Industrijska",
        number: "15",
        latitude: "45.262345678912345",
        longitude: "19.833456789123456"
      },
      reviews: [
        {
          id: 7,
          user: {
            id:12,
            name: "Luka",
            surname: "Simić",
            address: {
              city: "Novi Sad",
              street: "Radnička",
              number: "23",
              latitude: "45.261234",
              longitude: "19.832345"
            },
            phoneNumber: "+381649632587",
            email: "luka.simic@email.com",
            password: "hashedPasswordJKL",
            photo: "/profiles/luka.jpg",
            active: true
          },
          comment: "Professional product photos that boosted our online sales. Highly recommended!",
          rating: 5
        }
      ]
    }];
  getAll(): Observable<Service[]> {
    return of(this.services);
  }
  getById(id: number): Observable<Service | undefined> {
    const event = this.services.find(e => e.id === id);
    return of(event);
  }
  constructor() { }
}
