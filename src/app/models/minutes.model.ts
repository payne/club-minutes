export interface Attendee {
  firstName: string;
  callSign: string;
  role: string;
  arrivalTime?: string;
  departureTime?: string;
}

export interface BalanceHistoryEntry {
  balance: number;
  date: string;
}

export interface FinancialReport {
  currentBalance: number;
  changeSinceLastMonth: number;
  changeThisYear: number;
  balanceHistory?: BalanceHistoryEntry[];
}

export interface MinutesApproval {
  movedBy: string;
  secondedBy: string;
}

export interface CommitteeReport {
  committeeName: string;
  reportedBy: string;
  report: string[];
}

export type MinutesType = 'board' | 'meeting';

export interface MinutesFile {
  url: string;
  date: string;
  title: string;
  type: MinutesType;
}

export interface Club {
  id: string;
  name: string;
  minutesIndexUrl: string;
}

export interface ClubsConfig {
  clubs: Club[];
}

export interface MinutesIndex {
  minutes: MinutesFile[];
}

export interface BoardMinutes {
  date: string;
  clubName: string;
  attendees: Attendee[];
  financialReport: FinancialReport;
  minutesApproval: MinutesApproval;
  presidentReport: string[];
  vicePresidentReport: string[];
  committeeReports: CommitteeReport[];
  oldBusiness: string[];
  newBusiness: string[];
  announcements: string[];
}
