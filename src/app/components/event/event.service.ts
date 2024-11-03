import { Injectable } from '@angular/core';
import { Event } from './event';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  public SortOptions: string[] = ['id',
    'title',
    'description',
    'maxParticipants',
    'public',
    'city',
    'date',
    'type'];

private events: Event[] = [
  {
      id: 1,
      title: "Summer Music Festival",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum libero at malesuada consequat. Aliquam vel auctor ligula. Mauris blandit placerat sodales. Integer ligula neque, viverra in est consectetur, imperdiet imperdiet neque. In ac aliquet ipsum. Sed volutpat lorem eget imperdiet faucibus. Nunc velit nisl, ornare ut auctor sed, condimentum eget nulla. Ut tincidunt fermentum consectetur. Nullam dictum justo eget aliquam cursus. Suspendisse potenti. Aenean eget purus interdum, commodo nisi at, venenatis elit. Vestibulum luctus lacus velit, et porttitor nibh viverra nec. Maecenas vulputate, ex bibendum iaculis semper, nibh leo semper eros, quis mattis augue metus sed dui. Morbi bibendum, purus id facilisis congue, urna ex iaculis turpis, non lobortis lorem elit sit amet neque.",
      maxParticipants: 5000,
      public: true,
      address: {
          city: "Novi Sad",
          street: "Petrovaradin Fortress",
          number: "1",
          longitude: "19.833826521793377",
          latitude: "45.26938344115615"
      },
      date: new Date('2024-12-15'),
      type: {
          id: 1,
          title: "Music & Entertainment",
          description: "Musical performances and entertainment events",
          active: true
      }
  },
  {
      id: 2,
      title: "Tech Conference 2024",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum libero at malesuada consequat. Aliquam vel auctor ligula. Mauris blandit placerat sodales. Integer ligula neque, viverra in est consectetur, imperdiet imperdiet neque. In ac aliquet ipsum. Sed volutpat lorem eget imperdiet faucibus. Nunc velit nisl, ornare ut auctor sed, condimentum eget nulla. Ut tincidunt fermentum consectetur. Nullam dictum justo eget aliquam cursus. Suspendisse potenti. Aenean eget purus interdum, commodo nisi at, venenatis elit. Vestibulum luctus lacus velit, et porttitor nibh viverra nec. Maecenas vulputate, ex bibendum iaculis semper, nibh leo semper eros, quis mattis augue metus sed dui. Morbi bibendum, purus id facilisis congue, urna ex iaculis turpis, non lobortis lorem elit sit amet neque.",
      maxParticipants: 1000,
      public: true,
      address: {
          city: "Novi Sad",
          street: "Futoška",
          number: "1A",
          longitude: "19.833826521793377",
          latitude: "45.26938344115615"
      },
      date: new Date('2024-11-20'),
      type: {
          id: 2,
          title: "Conference",
          description: "Professional and educational conferences",
          active: true
      }
  },
  {
      id: 3,
      title: "Charity Run",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum libero at malesuada consequat. Aliquam vel auctor ligula. Mauris blandit placerat sodales. Integer ligula neque, viverra in est consectetur, imperdiet imperdiet neque. In ac aliquet ipsum. Sed volutpat lorem eget imperdiet faucibus. Nunc velit nisl, ornare ut auctor sed, condimentum eget nulla. Ut tincidunt fermentum consectetur. Nullam dictum justo eget aliquam cursus. Suspendisse potenti. Aenean eget purus interdum, commodo nisi at, venenatis elit. Vestibulum luctus lacus velit, et porttitor nibh viverra nec. Maecenas vulputate, ex bibendum iaculis semper, nibh leo semper eros, quis mattis augue metus sed dui. Morbi bibendum, purus id facilisis congue, urna ex iaculis turpis, non lobortis lorem elit sit amet neque.",
      maxParticipants: 500,
      public: true,
      address: {
          city: "Novi Sad",
          street: "Dunavski Park",
          number: "1",
          longitude: "19.833826521793377",
          latitude: "45.26938344115615"
      },
      date: new Date('2024-12-10'),
      type: {
          id: 3,
          title: "Sports & Fitness",
          description: "Athletic and sporting events",
          active: true
      }
  },
  {
      id: 4,
      title: "Private Wedding Reception",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum libero at malesuada consequat. Aliquam vel auctor ligula. Mauris blandit placerat sodales. Integer ligula neque, viverra in est consectetur, imperdiet imperdiet neque. In ac aliquet ipsum. Sed volutpat lorem eget imperdiet faucibus. Nunc velit nisl, ornare ut auctor sed, condimentum eget nulla. Ut tincidunt fermentum consectetur. Nullam dictum justo eget aliquam cursus. Suspendisse potenti. Aenean eget purus interdum, commodo nisi at, venenatis elit. Vestibulum luctus lacus velit, et porttitor nibh viverra nec. Maecenas vulputate, ex bibendum iaculis semper, nibh leo semper eros, quis mattis augue metus sed dui. Morbi bibendum, purus id facilisis congue, urna ex iaculis turpis, non lobortis lorem elit sit amet neque.",
      maxParticipants: 150,
      public: false,
      address: {
          city: "Novi Sad",
          street: "Bulevar oslobođenja",
          number: "56",
          longitude: "19.833826521793377",
          latitude: "45.26938344115615"
      },
      date: new Date('2024-12-25'),
      type: {
          id: 4,
          title: "Private Celebration",
          description: "Private celebrations and ceremonies",
          active: true
      }
  },
  {
      id: 5,
      title: "Food & Wine Festival",
      description: "Celebrating local cuisine and wineries",
      maxParticipants: 2000,
      public: true,
      address: {
        city: "Novi Sad",
        street: "Petrovaradin Fortress",
        number: "1",
        longitude: "19.833826521793377",
        latitude: "45.26938344115615"
      },
      date: new Date('2025-1-05'),
      type: {
          id: 5,
          title: "Food & Drink",
          description: "Culinary and beverage events",
          active: true
      }
  },
  {
      id: 6,
      title: "Art Gallery Opening",
      description: "Modern Art Exhibition Opening Night",
      maxParticipants: 200,
      public: true,
      address: {
          city: "New York",
          street: "5th Avenue",
          number: "1071",
          longitude: "-73.9665",
          latitude: "40.7829"
      },
      date: new Date('2024-12-01'),
      type: {
          id: 6,
          title: "Arts & Culture",
          description: "Cultural and artistic exhibitions",
          active: true
      }
  },
  {
      id: 7,
      title: "Corporate Team Building",
      description: "Private company retreat",
      maxParticipants: 50,
      public: false,
      address: {
          city: "Denver",
          street: "Lawrence Street",
          number: "1550",
          longitude: "-104.9903",
          latitude: "39.7392"
      },
      date: new Date('2024-10-15'),
      type: {
          id: 7,
          title: "Corporate Event",
          description: "Business and professional events",
          active: true
      }
  },
  {
      id: 8,
      title: "Halloween Party",
      description: "Annual costume party and haunted house",
      maxParticipants: 300,
      public: true,
      address: {
          city: "Los Angeles",
          street: "Hollywood Boulevard",
          number: "6801",
          longitude: "-118.2437",
          latitude: "34.0522"
      },
      date: new Date('2024-10-31'),
      type: {
          id: 8,
          title: "Holiday Celebration",
          description: "Seasonal and holiday events",
          active: true
      }
  },
  {
      id: 9,
      title: "Science Fair",
      description: "Student projects and demonstrations",
      maxParticipants: 400,
      public: true,
      address: {
          city: "Chicago",
          street: "Museum Campus Drive",
          number: "1400",
          longitude: "-87.6298",
          latitude: "41.8781"
      },
      date: new Date('2024-05-20'),
      type: {
          id: 9,
          title: "Education",
          description: "Educational and academic events",
          active: true
      }
  },
  {
      id: 10,
      title: "Book Club Meeting",
      description: "Discussion of monthly book selection",
      maxParticipants: 25,
      public: true,
      address: {
          city: "New York",
          street: "Park Avenue",
          number: "476",
          longitude: "-73.9665",
          latitude: "40.7829"
      },
      date: new Date('2024-11-05'),
      type: {
          id: 6,
          title: "Arts & Culture",
          description: "Cultural and artistic exhibitions",
          active: true
      }
  },
  {
      id: 11,
      title: "Yoga in the Park",
      description: "Morning yoga session for all levels",
      maxParticipants: 100,
      public: true,
      address: {
          city: "San Francisco",
          street: "Golden Gate Park",
          number: "501",
          longitude: "-122.4194",
          latitude: "37.7749"
      },
      date: new Date('2024-07-01'),
      type: {
          id: 3,
          title: "Sports & Fitness",
          description: "Athletic and sporting events",
          active: true
      }
  },
  {
      id: 12,
      title: "Film Festival",
      description: "Independent film screenings",
      maxParticipants: 600,
      public: true,
      address: {
          city: "Los Angeles",
          street: "Sunset Boulevard",
          number: "8000",
          longitude: "-118.2437",
          latitude: "34.0522"
      },
      date: new Date('2024-09-25'),
      type: {
          id: 1,
          title: "Music & Entertainment",
          description: "Musical performances and entertainment events",
          active: true
      }
  },
  {
      id: 13,
      title: "Private Birthday Party",
      description: "VIP celebration event",
      maxParticipants: 75,
      public: false,
      address: {
          city: "Miami",
          street: "Ocean Drive",
          number: "1100",
          longitude: "-80.1918",
          latitude: "25.7617"
      },
      date: new Date('2024-12-20'),
      type: {
          id: 4,
          title: "Private Celebration",
          description: "Private celebrations and ceremonies",
          active: true
      }
  },
  {
      id: 14,
      title: "Farmers Market",
      description: "Weekly local produce and crafts",
      maxParticipants: 1000,
      public: true,
      address: {
          city: "Chicago",
          street: "State Street",
          number: "50",
          longitude: "-87.6298",
          latitude: "41.8781"
      },
      date: new Date('2024-12-15'),
      type: {
          id: 5,
          title: "Food & Drink",
          description: "Culinary and beverage events",
          active: true
      }
  },
  {
      id: 15,
      title: "Chess Tournament",
      description: "Annual regional chess competition",
      maxParticipants: 128,
      public: true,
      address: {
          city: "New York",
          street: "West 42nd Street",
          number: "226",
          longitude: "-73.9665",
          latitude: "40.7829"
      },
      date: new Date('2024-12-15'),
      type: {
          id: 10,
          title: "Competition",
          description: "Competitive events and tournaments",
          active: true
      }
  },
  {
      id: 16,
      title: "Garden Workshop",
      description: "Learn about sustainable gardening",
      maxParticipants: 40,
      public: true,
      address: {
          city: "San Francisco",
          street: "Botanical Garden",
          number: "1199",
          longitude: "-122.4194",
          latitude: "37.7749"
      },
      date: new Date('2025-2-10'),
      type: {
          id: 9,
          title: "Education",
          description: "Educational and academic events",
          active: true
      }
  },
  {
      id: 17,
      title: "Private Concert",
      description: "Exclusive musical performance",
      maxParticipants: 200,
      public: false,
      address: {
          city: "New York",
          street: "Broadway",
          number: "1564",
          longitude: "-73.9665",
          latitude: "40.7829"
      },
      date: new Date('2025-1-4'),
      type: {
          id: 1,
          title: "Music & Entertainment",
          description: "Musical performances and entertainment events",
          active: true
      }
  }];
  constructor() { }

  getAll(): Observable<Event[]> {
    return of(this.events);
  }


  getById(id: number): Observable<Event | undefined> {
    const event = this.events.find(e => e.id === id);
    return of(event);
  }

  getTop(limit: number = 5, city: string = 'Novi Sad'): Observable<Event[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.getAll().pipe(
      map(events => {
        return events
          .filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today && 
                   !isNaN(eventDate.getTime()) && 
                   event.address.city === city;
          })
          .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
          })
          .slice(0, limit);
      })
    );
}


}
