export interface UserReportOverviewDTO {
    id: number;                  // Unique identifier for the user report
    reportedUserId: number;      // ID of the user being reported
    reporterId: number;          // ID of the reporter
    reporterEmail: string;       // Email of the reporter
    reportedUserName: string;    // First name of the reported user
    reportedUserSurname: string; // Last name of the reported user
    reportedUserEmail: string;   // Email of the reported user
    reason: string;              // Reason for the report
    status: UserReportStatus;    // Status of the user report
  }
  
  // Assuming UserReportStatus is an enum
  export enum UserReportStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DENIED = 'DENIED'
  }