import { Component } from '@angular/core';
import { UserReportsTableComponent } from "../user-reports-table/user-reports-table.component";

@Component({
  selector: 'app-admin-user-reports',
  standalone: true,
  imports: [UserReportsTableComponent],
  templateUrl: './admin-user-reports.component.html',
  styleUrl: './admin-user-reports.component.scss'
})
export class AdminUserReportsComponent {

}
