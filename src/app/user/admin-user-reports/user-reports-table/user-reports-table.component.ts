import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

// Services

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { UserReportService } from '../user-report.service';
import { UserReportOverviewDTO } from '../user-report-overview-dto';
import { TooltipModule } from 'primeng/tooltip';
import { UserReportStatus } from '../user-report-overview-dto';



@Component({
  selector: 'app-user-reports-table',
  templateUrl: './user-reports-table.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    TagModule,
    ToastModule,
    ConfirmDialogModule,TooltipModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class UserReportsTableComponent implements OnInit {
  userReports: UserReportOverviewDTO[] = [];
  selectedReports: UserReportOverviewDTO[] = [];
  UserReportStatus=UserReportStatus;
  @ViewChild('dt') dt!: Table;

  constructor(
    private userReportService: UserReportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadUserReports();
  }

  loadUserReports() {
    // TODO: Replace with actual service method to fetch reports
    this.userReportService.getPendingReports().subscribe({
      next: (reports) => {
        this.userReports = reports;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load user reports'
        });
      }
    });
  }

  filterTable(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(value, 'contains');
  }

  getStatusSeverity(status: string) {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'APPROVED':
        return 'success';
      case 'DENIED':
        return 'danger';
      default:
        return 'info';
    }
  }

  approveReport(report: UserReportOverviewDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to approve this report?',
      header: 'Confirm Approval',
      icon: 'pi pi-check-circle',
      accept: () => {
        this.userReportService.approveReport(report.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Approved',
              detail: 'Report has been approved'
            });
            this.loadUserReports();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to approve report'
            });
          }
        });
      }
    });
  }

  denyReport(report: UserReportOverviewDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to deny this report?',
      header: 'Confirm Denial',
      icon: 'pi pi-times-circle',
      accept: () => {
        this.userReportService.denyReport(report.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Denied',
              detail: 'Report has been denied'
            });
            this.loadUserReports();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to deny report'
            });
          }
        });
      }
    });
  }
}
