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
        street: "Central Park",
        number: "5th Avenue",
        city: "New York"
      },
      date: new Date('2024-07-15'),
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
        street: "Convention Center",
        number: "123 Tech Street",
        city: "San Francisco"
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
        street: "Riverside Park",
        number: "",
        city: "New York"
      },
      date: new Date('2024-09-10'),
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
        street: "Grand Hotel",
        number: "Ballroom",
        city: "Los Angeles"
      },
      date: new Date('2024-06-25'),
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
        street: "Downtown Food District",
        number: "",
        city: "Chicago"
      },
      date: new Date('2024-08-05'),
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
        street: "Metropolitan Art Gallery",
        number: "",
        city: "New York"
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
        street: "Mountain Resort",
        number: "",
        city: "Denver"
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
        street: "Community Center",
        number: "",
        city: "Los Angeles"
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
        street: "High School Gymnasium",
        number: "",
        city: "Chicago"
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
        street: "Public Library",
        number: "",
        city: "New York"
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
        street: "Sunrise Park",
        number: "",
        city: "San Francisco"
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
        street: "Cinema Complex",
        number: "",
        city: "Los Angeles"
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
        street: "Luxury Resort",
        number: "",
        city: "Miami"
      },
      date: new Date('2024-08-20'),
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
        street: "Market Square",
        number: "",
        city: "Chicago"
      },
      date: new Date('2024-06-15'),
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
        street: "Community Chess Club",
        number: "",
        city: "New York"
      },
      date: new Date('2024-11-15'),
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
        street: "Botanical Gardens",
        number: "",
        city: "San Francisco"
      },
      date: new Date('2024-05-10'),
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
        street: "Jazz Club",
        number: "",
        city: "New York"
      },
      date: new Date('2024-07-30'),
      type: {
        id: 1,
        title: "Music & Entertainment",
        description: "Musical performances and entertainment events",
        active: true
      }
    },
    {
      id: 18,
      title: "Career Fair",
      description: "Job opportunities and networking",
      maxParticipants: 1500,
      public: true,
      address: {
        street: "University Campus",
        number: "",
        city: "Chicago"
      },
      date: new Date('2024-09-15'),
      type: {
        id: 2,
        title: "Conference",
        description: "Professional and educational conferences",
        active: true
      }
    },
    {
      id: 19,
      title: "Photography Exhibition",
      description: "Wildlife photography showcase",
      maxParticipants: 300,
      public: true,
      address: {
        street: "City Art Museum",
        number: "",
        city: "Los Angeles"
      },
      date: new Date('2024-08-10'),
      type: {
        id: 6,
        title: "Arts & Culture",
        description: "Cultural and artistic exhibitions",
        active: true
      }
    },
    {
      id: 20,
      title: "New Year's Gala",
      description: "End of year celebration",
      maxParticipants: 500,
      public: true,
      address: {
        street: "Grand Plaza Hotel",
        number: "",
        city: "New York"
      },
      date: new Date('2024-12-31'),
      type: {
        id: 8,
        title: "Holiday Celebration",
        description: "Seasonal and holiday events",
        active: true
      }
    }
  ];
  constructor() { }

  getAll(): Observable<Event[]> {
    return of(this.events);
  }


  getById(id: number): Observable<Event | undefined> {
    const event = this.events.find(e => e.id === id);
    return of(event);
  }



}
