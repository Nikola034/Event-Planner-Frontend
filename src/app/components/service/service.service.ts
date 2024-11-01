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
      }
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
      }
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
      }
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
      }
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
      }
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
      }
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
      }
    },
    {
      id: 8,
      title: "Premium Real Estate Photography",
      description: "Comprehensive Real Estate Photography service showcasing properties in their best light",
      specificity: "Interior and exterior property shots using wide-angle lenses, HDR techniques, and optimal natural lighting. Includes virtual tour options and aerial photography integration when needed.",
      price: 299.99,
      discount: 0,
      visible: true,
      available: true,
      minDuration: 120,
      maxDuration: 180,
      reservationDeadline: 48,
      cancelReservation: 72,
      automaticReservation: false,
      deleted: false,
      photos: [
        "https://example.com/real-estate.jpg"
      ],
      availableTimeslots: "Monday-Saturday: 10:00-16:00",
      category: {
        id: 7,
        title: "Real Estate Photography",
        description: "Professional photography for real estate listings",
        pending: false
      }
    },
    {
      id: 9,
      title: "Heritage Photo Restoration",
      description: "Specialized Photo Restoration service bringing new life to treasured old photographs",
      specificity: "Restore and repair old photographs including damage repair, color restoration, contrast enhancement, and digital preservation. Suitable for family heirlooms and historical photographs.",
      price: 79.99,
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
        "https://example.com/restoration.jpg"
      ],
      availableTimeslots: "Monday-Friday: 9:00-17:00",
      category: {
        id: 3,
        title: "Post-Production",
        description: "Professional photo editing and enhancement services",
        pending: false
      }
    },
    {
      id: 10,
      title: "Aerial Photography & Videography",
      description: "Professional Drone Photography service offering unique perspectives from above",
      specificity: "Drone photography and videography for real estate, events, and commercial projects. Includes HD video footage, still photographs, and compliance with local aviation regulations.",
      price: 449.99,
      discount: 10,
      visible: true,
      available: true,
      minDuration: 120,
      maxDuration: 240,
      reservationDeadline: 72,
      cancelReservation: 96,
      automaticReservation: false,
      deleted: false,
      photos: [
        "https://example.com/aerial.jpg"
      ],
      availableTimeslots: "Monday-Sunday: 8:00-18:00",
      category: {
        id: 8,
        title: "Specialty Photography",
        description: "Specialized photography services using advanced equipment",
        pending: false
      }
    }
  ];
  getAll(): Observable<Service[]> {
    return of(this.services);
  }
  getById(id: number): Observable<Service | undefined> {
    const event = this.services.find(e => e.id === id);
    return of(event);
  }
  constructor() { }
}
