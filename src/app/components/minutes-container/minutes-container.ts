import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MinutesData } from '../../services/minutes-data';
import { BoardMinutes, MinutesFile, Club, MinutesType } from '../../models/minutes.model';
import { Attendance } from '../attendance/attendance';
import { FinancialReport } from '../financial-report/financial-report';
import { MinutesApproval } from '../minutes-approval/minutes-approval';
import { PresidentReport } from '../president-report/president-report';
import { VicePresidentReport } from '../vice-president-report/vice-president-report';
import { CommitteeReports } from '../committee-reports/committee-reports';
import { OldBusiness } from '../old-business/old-business';
import { NewBusiness } from '../new-business/new-business';
import { Announcements } from '../announcements/announcements';
import { AboutDialog } from '../about-dialog/about-dialog';

@Component({
  selector: 'app-minutes-container',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatDividerModule,
    Attendance,
    FinancialReport,
    MinutesApproval,
    PresidentReport,
    VicePresidentReport,
    CommitteeReports,
    OldBusiness,
    NewBusiness,
    Announcements
  ],
  templateUrl: './minutes-container.html',
  styleUrl: './minutes-container.css',
})
export class MinutesContainer implements OnInit {
  minutes?: BoardMinutes;
  loading = true;
  error = false;
  availableMinutes: MinutesFile[] = [];
  currentFile?: MinutesFile;
  darkMode = false;
  clubs: Club[] = [];
  currentClub?: Club;
  selectedMinutesType: MinutesType = 'board';
  filteredMinutes: MinutesFile[] = [];

  constructor(
    private minutesData: MinutesData,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadClubs();
    this.loadDarkModePreference();
  }

  loadClubs() {
    this.minutesData.loadClubsConfig().subscribe({
      next: (config) => {
        this.clubs = config.clubs;
        if (this.clubs.length > 0) {
          // Try to load saved club preference
          const savedClubId = localStorage.getItem('selectedClubId');
          const savedClub = savedClubId
            ? this.clubs.find(c => c.id === savedClubId)
            : null;
          this.selectClub(savedClub || this.clubs[0]);
        }
      },
      error: (err) => {
        console.error('Error loading clubs config:', err);
        this.error = true;
      }
    });
  }

  selectClub(club: Club) {
    this.currentClub = club;
    localStorage.setItem('selectedClubId', club.id);
    this.loadIndex(club.minutesIndexUrl);
  }

  loadIndex(indexUrl: string) {
    this.minutesData.loadIndex(indexUrl).subscribe({
      next: (index) => {
        this.availableMinutes = index.minutes;
        this.filterMinutesByType();
        if (this.filteredMinutes.length > 0) {
          this.loadMinutesFile(this.filteredMinutes[0]);
        }
      },
      error: (err) => {
        console.error('Error loading index:', err);
        this.error = true;
      }
    });
  }

  selectMinutesType(type: MinutesType) {
    this.selectedMinutesType = type;
    this.filterMinutesByType();
    if (this.filteredMinutes.length > 0) {
      this.loadMinutesFile(this.filteredMinutes[0]);
    }
  }

  filterMinutesByType() {
    this.filteredMinutes = this.availableMinutes.filter(
      m => m.type === this.selectedMinutesType
    );
  }

  loadMinutesFile(file: MinutesFile) {
    this.loading = true;
    this.error = false;
    this.currentFile = file;
    this.minutesData.loadMinutes(file.url).subscribe({
      next: (data) => {
        this.minutes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading minutes:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-theme', this.darkMode);
    localStorage.setItem('darkMode', this.darkMode.toString());
  }

  loadDarkModePreference() {
    const savedPreference = localStorage.getItem('darkMode');
    if (savedPreference === 'true') {
      this.darkMode = true;
      document.body.classList.add('dark-theme');
    }
  }

  openAboutDialog() {
    this.dialog.open(AboutDialog, {
      width: '90vw',
      maxWidth: '400px'
    });
  }

  print() {
    window.print();
  }

  exportToMarkdown() {
    if (!this.minutes || !this.currentFile) return;

    const minutesType = this.currentFile.type === 'board' ? 'Board Meeting' : 'General Meeting';
    let markdown = `# ${this.minutes.clubName}\n`;
    markdown += `## ${minutesType} Minutes\n`;
    markdown += `**Date:** ${this.minutes.date}\n\n`;

    // Attendance
    markdown += `## Attendance\n\n`;
    markdown += `| Name | Call Sign | Role | Arrival | Departure |\n`;
    markdown += `|------|-----------|------|---------|------------|\n`;
    this.minutes.attendees.forEach(attendee => {
      markdown += `| ${attendee.firstName} | ${attendee.callSign} | ${attendee.role} | ${attendee.arrivalTime || ''} | ${attendee.departureTime || ''} |\n`;
    });
    markdown += `\n`;

    // Financial Report
    markdown += `## Financial Report\n\n`;
    markdown += `- **Current Balance:** $${this.minutes.financialReport.currentBalance.toFixed(2)}\n`;
    markdown += `- **Change Since Last Month:** $${this.minutes.financialReport.changeSinceLastMonth.toFixed(2)}\n`;
    markdown += `- **Change This Year:** $${this.minutes.financialReport.changeThisYear.toFixed(2)}\n\n`;

    if (this.minutes.financialReport.balanceHistory && this.minutes.financialReport.balanceHistory.length > 0) {
      markdown += `### Balance History\n\n`;
      markdown += `| Date | Balance |\n`;
      markdown += `|------|----------|\n`;
      this.minutes.financialReport.balanceHistory.forEach(entry => {
        markdown += `| ${entry.date} | $${entry.balance.toFixed(2)} |\n`;
      });
      markdown += `\n`;
    }

    // Minutes Approval
    markdown += `## Minutes Approval\n\n`;
    markdown += `- **Moved by:** ${this.minutes.minutesApproval.movedBy}\n`;
    markdown += `- **Seconded by:** ${this.minutes.minutesApproval.secondedBy}\n\n`;

    // President's Report
    markdown += `## President's Report\n\n`;
    markdown += `${this.minutes.presidentReport}\n\n`;

    // Vice President's Report
    markdown += `## Vice President's Report\n\n`;
    markdown += `${this.minutes.vicePresidentReport}\n\n`;

    // Committee Reports
    markdown += `## Committee Reports\n\n`;
    this.minutes.committeeReports.forEach(report => {
      markdown += `### ${report.committeeName}\n`;
      markdown += `**Reported by:** ${report.reportedBy}\n\n`;
      markdown += `${report.report}\n\n`;
    });

    // Old Business
    markdown += `## Old Business\n\n`;
    this.minutes.oldBusiness.forEach(item => {
      markdown += `- ${item}\n`;
    });
    markdown += `\n`;

    // New Business
    markdown += `## New Business\n\n`;
    this.minutes.newBusiness.forEach(item => {
      markdown += `- ${item}\n`;
    });
    markdown += `\n`;

    // Announcements
    markdown += `## Announcements\n\n`;
    this.minutes.announcements.forEach(item => {
      markdown += `- ${item}\n`;
    });

    // Create and download file
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.currentClub?.id || 'club'}_${this.currentFile.type}_${this.minutes.date}.md`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
