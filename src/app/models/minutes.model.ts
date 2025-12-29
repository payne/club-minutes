export interface Attendee {
  firstName: string;
  callSign: string;
  role: string;
  arrivalTime?: string;
  departureTime?: string;
}

export interface FinancialReport {
  currentBalance: number;
  changeSinceLastMonth: number;
  changeThisYear: number;
  balanceHistory?: number[]; // For spark graph
}

export interface MinutesApproval {
  movedBy: string;
  secondedBy: string;
}

export interface CommitteeReport {
  committeeName: string;
  reportedBy: string;
  report: string;
}

export interface BoardMinutes {
  date: string;
  clubName: string;
  attendees: Attendee[];
  financialReport: FinancialReport;
  minutesApproval: MinutesApproval;
  presidentReport: string;
  vicePresidentReport: string;
  committeeReports: CommitteeReport[];
  oldBusiness: string[];
  newBusiness: string[];
  announcements: string[];
}
