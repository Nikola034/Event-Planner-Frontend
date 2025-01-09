export interface UserReportResponseDTO {
    id: number;               // Unique identifier of the report
    reportedUserId: number;   // ID of the user being reported
    reporterId: number;       // ID of the user who reported
    reason: string;           // Reason for the report
    approved: boolean;        // Status indicating if the report is approved
  }