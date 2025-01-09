import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserReportDTO } from '../../shared/messaging/model/user-report-dto';
import { UserReportResponseDTO } from '../../shared/messaging/model/user-report-response-dto';
import { Observable } from 'rxjs';
import { API_URL } from '../../../globals';
import { UserReportOverviewDTO } from './user-report-overview-dto';

@Injectable({
  providedIn: 'root'
})
export class UserReportService {
  private readonly baseUrl = `${API_URL}/api/v1/user-reports`; // Base API endpoint

  constructor(private http: HttpClient) {}

  // Report a user
  reportUser(reportRequest: UserReportDTO): Observable<UserReportResponseDTO> {
    return this.http.post<UserReportResponseDTO>(`${this.baseUrl}`, reportRequest);
  }

  // Get all user reports
  getPendingReports(): Observable<UserReportOverviewDTO[]> {
    return this.http.get<UserReportOverviewDTO[]>(`${this.baseUrl}`);
  }

  approveReport(reportId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${reportId}/approve`, {});
  }

  denyReport(reportId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${reportId}/deny`, {});
  }

  // // Suspend a user by report ID
  // suspendUser(reportId: number): Observable<UserSuspensionDTO> {
  //   return this.http.post<UserSuspensionDTO>(`${this.baseUrl}/${reportId}/suspend`, {});
  // }

  // // Check suspension status of a user by user ID
  // checkSuspensionStatus(userId: number): Observable<SuspensionStatusDTO> {
  //   return this.http.get<SuspensionStatusDTO>(`${this.baseUrl}/users/${userId}/suspension`);
  // }

}
