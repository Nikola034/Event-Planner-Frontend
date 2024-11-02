import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [{
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
    photos: [
      "/dinja.jpg"
    ],
    category: {
      id: 1,
      title: "Cameras",
      description: "Professional-grade cameras for photography and videography, including DSLRs, mirrorless cameras, and specialized video cameras. Our selection features the latest technology and reliable performance for all shooting scenarios.",
      pending: false
    },
    address: {
      latitude: '45.255115849023438',
      longitude: '19.844731241859632'
    }
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
    photos: [
      "https://example.com/studio-kit.jpg"
    ],
    category: {
      id: 2,
      title: "Lighting Equipment",
      description: "Comprehensive lighting solutions for studio and location photography. From continuous LED lights to professional strobes, our lighting equipment ensures optimal illumination for any photography or video project.",
      pending: false
    },
    address: {
      latitude: '46.100245923847392',
      longitude: '19.667845234789123'
    }
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
    photos: [
      "https://example.com/drone.jpg"
    ],
    category: {
      id: 3,
      title: "Aerial Equipment",
      description: "State-of-the-art drones and aerial photography equipment for capturing stunning aerial perspectives. Our selection includes professional-grade drones with advanced features for both photography and videography.",
      pending: false
    },
    address: {
      latitude: '45.245678912345678',
      longitude: '19.851234567891234'
    }
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
    photos: [
      "https://example.com/gopro.jpg"
    ],
    category: {
      id: 1,
      title: "Cameras",
      description: "Professional-grade cameras for photography and videography, including DSLRs, mirrorless cameras, and specialized video cameras. Our selection features the latest technology and reliable performance for all shooting scenarios.",
      pending: false
    },
    address: {
      latitude: '46.095678912345678',
      longitude: '19.673456789123456'
    }
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
    photos: [
      "https://example.com/gimbal.jpg"
    ],
    category: {
      id: 4,
      title: "Camera Support",
      description: "Professional camera support solutions including gimbals, tripods, monopods, and stabilization systems. Essential equipment for achieving smooth, professional-quality footage and stable shots in any situation.",
      pending: false
    },
    address: {
      latitude: '45.249876543210987',
      longitude: '19.837654321098765'
    }
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
    photos: [
      "https://example.com/lens-kit.jpg"
    ],
    category: {
      id: 5,
      title: "Lenses",
      description: "Premium photographic lenses for all shooting situations, from wide-angle to telephoto. Our collection includes prime and zoom lenses from leading manufacturers, suitable for both photography and videography.",
      pending: false
    },
    address: {
      latitude: '46.105678912345678',
      longitude: '19.659876543210987'
    }
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
    photos: [
      "https://example.com/audio-kit.jpg"
    ],
    category: {
      id: 6,
      title: "Audio Equipment",
      description: "Professional audio recording solutions including wireless microphones, field recorders, and audio interfaces. Essential equipment for capturing high-quality sound for video production and live events.",
      pending: false
    },
    address: {
      latitude: '45.262345678912345',
      longitude: '19.833456789123456'
    }
  },
  {
    id: 8,
    title: "Professional Studio Backdrop Collection",
    description: "Photography Backdrop Set",
    specificity: "Comprehensive backdrop kit featuring various colors and patterns, heavy-duty support system, and clips. Includes muslin, vinyl, and chromakey options for versatile studio photography.",
    price: 49.99,
    discount: 20,
    visible: true,
    available: true,
    minDuration: 4,
    maxDuration: 72,
    reservationDeadline: 24,
    cancelReservation: 48,
    automaticReservation: false,
    deleted: false,
    photos: [
      "https://example.com/backdrop.jpg"
    ],
    category: {
      id: 7,
      title: "Studio Accessories",
      description: "Complete range of studio photography accessories including backdrops, props, and studio organization equipment. Essential items for creating professional studio setups and achieving desired creative effects.",
      pending: false
    },
    address: {
      latitude: '46.108765432109876',
      longitude: '19.665432109876543'
    }
  },
  {
    id: 9,
    title: "Professional Underwater Camera Housing",
    description: "Underwater Camera Housing",
    specificity: "Waterproof housing for Canon 5D series, rated to 40m depth. Features ergonomic controls, vacuum seal system, and optical glass ports. Includes moisture sensors and maintenance kit.",
    price: 189.99,
    discount: 0,
    visible: true,
    available: true,
    minDuration: 4,
    maxDuration: 48,
    reservationDeadline: 24,
    cancelReservation: 48,
    automaticReservation: false,
    deleted: false,
    photos: [
      "https://example.com/underwater-housing.jpg"
    ],
    category: {
      id: 8,
      title: "Specialty Equipment",
      description: "Specialized photography equipment for unique shooting situations, including underwater housings, macro photography gear, and technical camera accessories. Professional-grade equipment for specific photography needs.",
      pending: false
    },
    address: {
      latitude: '45.267890123456789',
      longitude: '19.847890123456789'
    }
  },
  {
    id: 10,
    title: "Professional Motorized Camera Slider",
    description: "Video Slider",
    specificity: "100cm motorized camera slider with programmable movements and time-lapse functionality. Features quiet operation, wireless control, and payload capacity up to 15kg.",
    price: 129.99,
    discount: 5,
    visible: true,
    available: true,
    minDuration: 4,
    maxDuration: 72,
    reservationDeadline: 24,
    cancelReservation: 48,
    automaticReservation: false,
    deleted: false,
    photos: [
      "https://example.com/slider.jpg"
    ],
    category: {
      id: 4,
      title: "Camera Support",
      description: "Professional camera support solutions including gimbals, tripods, monopods, and stabilization systems. Essential equipment for achieving smooth, professional-quality footage and stable shots in any situation.",
      pending: false
    },
    address: {
      latitude: '46.091234567891234',
      longitude: '19.669876543210987'
    }
  }
];

  getAll(): Observable<Product[]> {
    return of(this.products);
  }
  getById(id: number): Observable<Product | undefined> {
    const event = this.products.find(e => e.id === id);
    return of(event);
  }
  constructor() { }
}
