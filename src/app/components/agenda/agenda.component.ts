import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CreateEventTypeFormComponent } from '../create-event-type-form/create-event-type-form.component';
import { EditEventTypeFormComponent } from '../edit-event-type-form/edit-event-type-form.component';
import { CreateActivityFormComponent } from "../create-activity-form/create-activity-form.component";
import { EditActivityFormComponent } from '../edit-activity-form/edit-activity-form.component';
import { ActivityOverviewDTO } from './activity-overview.dto';
import { EventService } from '../event/event.service';
import { tap } from 'rxjs';
import { response } from 'express';
import { CreateEventResponseDTO } from '../my-events/dtos/CreateEventResponse.dto';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { JwtService } from '../auth/jwt.service';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, DialogModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent {
  displayAddForm: boolean = false;
  displayEditForm: boolean = false;
  event!: CreateEventResponseDTO ;

  role!: string;

  activities: ActivityOverviewDTO[] = [];
  selectedActivity!: ActivityOverviewDTO ;
  eventId!:number;

  constructor(private eventService: EventService,private route:ActivatedRoute, private router: Router, private jwtService: JwtService){}

  ngOnInit(){
    this.loadData();
    if(typeof window !== 'undefined' && window.localStorage){
      this.role = this.jwtService.getRoleFromToken();
    }
  }


  loadData(): void{
    const id = this.route.snapshot.paramMap.get('id');
    this.eventId = id ? Number(id) : -1;
    this.eventService.getById(this.eventId).pipe(tap(response => {
      this.event = response
    })).subscribe()
    this.eventService.getAgenda(this.eventId).pipe(tap(response => {
      this.activities = response
    })).subscribe()
  }

  generatePdfReport() {
    if (!this.activities || this.activities.length === 0) {
      console.error('No activities available to generate the PDF report.');
      return;
    }
  
    // Create a new jsPDF instance
    const pdf = new jsPDF();
  
    // Add a title
    pdf.setFontSize(18);
    pdf.text(`Agenda for Event: ${this.event.title}`, 105, 10, { align: 'center' });
    pdf.setFontSize(12);
  
    // Prepare table headers and data
    const headers = [['Title', 'Address', 'Description', 'Start', 'End']];
    const data = this.activities.map((activity) => [
      activity.title,
      `${activity.address?.city}, ${activity.address?.street}, ${activity.address?.number}`,
      activity.description,
      activity.startTime,
      activity.endTime,
    ]);
  
    // Add table to the PDF
    (pdf as any).autoTable({
      head: headers,
      body: data,
      startY: 20, // Position table below the title
      theme: 'striped', // Table theme
      styles: { fontSize: 10 },
    });
  
    // Save the PDF
    pdf.save(`${this.event.title.replace(/[^a-zA-Z0-9]/g, '_')}_Agenda.pdf`);
  }

  showAddForm() {
    this.router.navigate(['home/agenda', this.eventId, 'add'])
  }

  showEditForm(a: ActivityOverviewDTO) {
    this.router.navigate(['home/agenda/edit', a.id])
  }

  onDelete(activityId: number): void {
    this.eventService.deleteActivity(this.eventId, activityId).pipe(tap(response => {
      this.loadData();
    })).subscribe()
  }
}
