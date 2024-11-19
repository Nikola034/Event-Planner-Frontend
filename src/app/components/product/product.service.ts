import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
        id: 1,
        title: "Canon EOS 5D Mark IV Professional Kit",
        description: "Professional DSLR Camera Kit",
        specificity: "Full-frame DSLR camera with versatile 24-70mm f/2.8L lens, perfect for professional photography. Includes extra battery, memory cards, and carrying case. Ideal for wedding photography, portraits, and events.",
        price: 299.99,
        discount: 0,
        visible: true,
        available: true,
        minDuration: 4,
        maxDuration: 72,
        reservationDeadline: 24,
        cancelReservation: 48,
        automaticReservation: false,
        deleted: false,
        photos: ["/dinja.jpg"],
        eventTypes: [],
        category: {
            id: 1,
            title: "Cameras",
            description: "Professional-grade cameras for photography and videography, including DSLRs, mirrorless cameras, and specialized video cameras. Our selection features the latest technology and reliable performance for all shooting scenarios.",
            pending: false
        },
        address: {
            city: "Novi Sad",
            street: "Bulevar oslobođenja",
            number: "100",
            latitude: "45.255115849023438",
            longitude: "19.844731241859632"
        },
        reviews: [
            {
              id:5,
                user: {
                  id:7,
                    name: "John",
                    surname: "Doe",
                    address: {
                        city: "Novi Sad",
                        street: "Bulevar Evrope",
                        number: "15",
                        longitude: "19.8234",
                        latitude: "45.2543"
                    },
                    phoneNumber: "+381641234567",
                    email: "john.doe@email.com",
                    password: "hashedPassword123",
                    photo: "/john-profile.jpg",
                    active: true
                },
                comment: "Excellent camera kit, perfect for professional use",
                rating: 5
            },
            {
              id:6,
                user: {
                  id:5,
                    name: "Sarah",
                    surname: "Johnson",
                    address: {
                        city: "Subotica",
                        street: "Zmaj Jovina",
                        number: "22",
                        longitude: "19.6681",
                        latitude: "46.1002"
                    },
                    phoneNumber: "+381651234567",
                    email: "sarah.j@email.com",
                    password: "hashedPassword456",
                    photo: "/sarah-profile.jpg",
                    active: true
                },
                comment: "Great lighting kit, very easy to set up",
                rating: 4
            }
        ]
    },
    {
        id: 2,
        title: "Professional Studio Lighting Kit",
        description: "Lighting Studio Kit",
        specificity: "Complete studio lighting solution featuring two 1000W softboxes, adjustable stands, and a versatile backdrop system. Includes carrying cases and wireless remote triggers for easy setup and control.",
        price: 149.99,
        discount: 10,
        visible: true,
        available: true,
        minDuration: 4,
        maxDuration: 48,
        reservationDeadline: 24,
        cancelReservation: 48,
        automaticReservation: false,
        deleted: false,
        photos: ["https://example.com/studio-kit.jpg"],
        eventTypes: [],
        category: {
            id: 2,
            title: "Lighting Equipment",
            description: "Comprehensive lighting solutions for studio and location photography. From continuous LED lights to professional strobes, our lighting equipment ensures optimal illumination for any photography or video project.",
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
              id:6,
                user: {
                  id:5,
                    name: "Sarah",
                    surname: "Johnson",
                    address: {
                        city: "Subotica",
                        street: "Zmaj Jovina",
                        number: "22",
                        longitude: "19.6681",
                        latitude: "46.1002"
                    },
                    phoneNumber: "+381651234567",
                    email: "sarah.j@email.com",
                    password: "hashedPassword456",
                    photo: "/sarah-profile.jpg",
                    active: true
                },
                comment: "Great lighting kit, very easy to set up",
                rating: 4
            }
        ]
    },
    {
        id: 3,
        title: "DJI Mavic Air 2 Drone Kit",
        description: "Drone with 4K Camera",
        specificity: "Advanced aerial photography drone with 4K/60fps camera, 3-axis gimbal, and intelligent flight modes. Includes extra batteries, ND filters, and professional carrying case for safe transport.",
        price: 199.99,
        discount: 0,
        visible: true,
        available: true,
        minDuration: 4,
        maxDuration: 24,
        reservationDeadline: 24,
        cancelReservation: 48,
        automaticReservation: false,
        deleted: false,
        photos: ["https://example.com/drone.jpg"],
        eventTypes: [],
        category: {
            id: 3,
            title: "Aerial Equipment",
            description: "State-of-the-art drones and aerial photography equipment for capturing stunning aerial perspectives. Our selection includes professional-grade drones with advanced features for both photography and videography.",
            pending: false
        },
        address: {
            city: "Novi Sad",
            street: "Futoška",
            number: "1A",
            latitude: "45.245678912345678",
            longitude: "19.851234567891234"
        },
        reviews: [
            {
              id:7,
                user: {
                  id:4,
                    name: "Mike",
                    surname: "Wilson",
                    address: {
                        city: "Novi Sad",
                        street: "Lasla Gala",
                        number: "32",
                        longitude: "19.8534",
                        latitude: "45.2456"
                    },
                    phoneNumber: "+381631234567",
                    email: "mike.w@email.com",
                    password: "hashedPassword789",
                    photo: "/mike-profile.jpg",
                    active: true
                },
                comment: "Amazing drone, battery life could be better",
                rating: 4
            }
        ]
    },
    {
        id: 4,
        title: "GoPro Hero 10 Black Adventure Kit",
        description: "GoPro Hero 10",
        specificity: "Latest GoPro action camera featuring 5.3K video, advanced stabilization, and waterproof design. Kit includes mounting accessories, extra batteries, and protective case.",
        price: 89.99,
        discount: 0,
        visible: true,
        available: true,
        minDuration: 4,
        maxDuration: 72,
        reservationDeadline: 24,
        cancelReservation: 48,
        automaticReservation: true,
        deleted: false,
        photos: ["https://example.com/gopro.jpg"],
        eventTypes: [],
        category: {
            id: 1,
            title: "Cameras",
            description: "Professional-grade cameras for photography and videography, including DSLRs, mirrorless cameras, and specialized video cameras. Our selection features the latest technology and reliable performance for all shooting scenarios.",
            pending: false
        },
        address: {
            city: "Subotica",
            street: "Petefi Šandora",
            number: "3",
            latitude: "46.095678912345678",
            longitude: "19.673456789123456"
        },
        reviews: [
            {
              id:8,
                user: {
                  id:3,
                    name: "Emily",
                    surname: "Brown",
                    address: {
                        city: "Subotica",
                        street: "Maksima Gorkog",
                        number: "12",
                        longitude: "19.6735",
                        latitude: "46.0957"
                    },
                    phoneNumber: "+381621234567",
                    email: "emily.b@email.com",
                    password: "hashedPasswordABC",
                    photo: "/emily-profile.jpg",
                    active: true
                },
                comment: "Perfect for adventure sports, great stabilization",
                rating: 5
            }
        ]
    },
    {
        id: 5,
        title: "DJI Ronin SC Pro Stabilizer Kit",
        description: "Gimbal Stabilizer",
        specificity: "Professional 3-axis gimbal stabilizer for mirrorless cameras, featuring intelligent shooting modes and advanced stabilization algorithms. Includes follow focus, carrying case, and extra batteries.",
        price: 79.99,
        discount: 15,
        visible: true,
        available: true,
        minDuration: 4,
        maxDuration: 48,
        reservationDeadline: 24,
        cancelReservation: 48,
        automaticReservation: false,
        deleted: false,
        photos: ["https://example.com/gimbal.jpg"],
        eventTypes: [],
        category: {
            id: 4,
            title: "Camera Support",
            description: "Professional camera support solutions including gimbals, tripods, monopods, and stabilization systems. Essential equipment for achieving smooth, professional-quality footage and stable shots in any situation.",
            pending: false
        },
        address: {
            city: "Novi Sad",
            street: "Narodnog fronta",
            number: "53",
            latitude: "45.249876543210987",
            longitude: "19.837654321098765"
        },
        reviews: [
            {
                id:9,
                user: {
                    id:3,
                    name: "David",
                    surname: "Lee",
                    address: {
                        city: "Novi Sad",
                        street: "Vladimira Perića Valtera",
                        number: "5",
                        longitude: "19.8377",
                        latitude: "45.2499"
                    },
                    phoneNumber: "+381611234567",
                    email: "david.l@email.com",
                    password: "hashedPasswordDEF",
                    photo: "/david-profile.jpg",
                    active: true
                },
                comment: "Smooth operation, great for professional videography",
                rating: 5
            }
        ]
    },
    {
        id: 6,
        title: "Professional Prime Lens Collection",
        description: "Lens Kit",
        specificity: "High-end prime lens set featuring 35mm f/1.4, 50mm f/1.2, and 85mm f/1.4 lenses. Perfect for portrait photography and low-light situations. Includes protective filters and carrying case.",
        price: 159.99,
        discount: 0,
        visible: true,
        available: true,
        minDuration: 4,
        maxDuration: 72,
        reservationDeadline: 24,
        cancelReservation: 48,
        automaticReservation: false,
        deleted: false,
        photos: ["https://example.com/lens-kit.jpg"],
        eventTypes: [],
        category: {
            id: 5,
            title: "Lenses",
            description: "Premium photographic lenses for all shooting situations, from wide-angle to telephoto. Our collection includes prime and zoom lenses from leading manufacturers, suitable for both photography and videography.",
            pending: false
        },
        address: {
            city: "Subotica",
            street: "Đure Đakovića",
            number: "24",
            latitude: "46.105678912345678",
            longitude: "19.659876543210987"
        },
        reviews: [
            {
              id:10,
                user: {
                    id:2,
                    name: "Linda",
                    surname: "Taylor",
                    address: {
                        city: "Subotica",
                        street: "Braće Radić",
                        number: "8",
                        longitude: "19.6599",
                        latitude: "46.1057"
                    },
                    phoneNumber: "+381601234567",
                    email: "linda.t@email.com",
                    password: "hashedPasswordGHI",
                    photo: "/linda-profile.jpg",
                    active: true
                },
                comment: "Outstanding lens collection, perfect for portraits",
                rating: 5
            }
        ]
    },
    {
        id: 7,
        title: "Rode Wireless GO II Audio System",
        description: "Audio Recording Kit",
        specificity: "Dual-channel wireless microphone system with two transmitters and one receiver. Includes lavalier microphones, windshields, and mounting accessories for professional audio capture.",
        price: 69.99,
        discount: 0,
        visible: true,
        available: true,
        minDuration: 4,
        maxDuration: 48,
        reservationDeadline: 24,
        cancelReservation: 48,
        automaticReservation: true,
        deleted: false,
        photos: ["https://example.com/audio-kit.jpg"],
        eventTypes: [],
        category: {
            id: 6,
            title: "Audio Equipment",
            description: "Professional audio recording solutions including wireless microphones, field recorders, and audio interfaces. Essential equipment for capturing high-quality sound for video production and live events.",
            pending: false
        },
        address: {
            city: "Novi Sad",
            street: "Kralja Aleksandra",
            number: "12",
            latitude: "45.262345678912345",
            longitude: "19.833456789123456"
        },
        reviews: [
            {
              id:11,
                user: {
                    id:1,
                    name: "James",
                    surname: "Anderson",
                    address: {
                        city: "Novi Sad",
                        street: "Vojvođanskih brigada",
                        number: "19",
                        longitude: "19.8335",
                        latitude: "45.2623"
                    },
                    phoneNumber: "+381691234567",
                    email: "james.a@email.com",
                    password: "hashedPasswordJKL",
                    photo: "/james-profile.jpg",
                    active: true
                },
                comment: "Crystal clear audio, very reliable system",
                rating: 4
            }
        ]
    }];

  getAll(): Observable<Product[]> {
    return of(this.products);
  }
  getById(id: number): Observable<Product | undefined> {
    const event = this.products.find(e => e.id === id);
    return of(event);
  }
  constructor() { }
}
