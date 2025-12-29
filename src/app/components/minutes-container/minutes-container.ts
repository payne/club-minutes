import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
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

  expandedPanels: Set<string> = new Set();
  private isRestoringState = false;

  constructor(
    private minutesData: MinutesData,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadDarkModePreference();

    // Read URL parameters
    this.route.queryParams.subscribe(params => {
      const clubId = params['club'];
      const minutesType = params['type'] as MinutesType;
      const minutesUrl = params['minutes'];
      const expanded = params['expanded'];

      if (expanded) {
        this.expandedPanels = new Set(expanded.split(','));
      }

      if (minutesType) {
        this.selectedMinutesType = minutesType;
      }

      this.loadClubs(clubId, minutesUrl);
    });
  }

  loadClubs(urlClubId?: string, urlMinutesUrl?: string) {
    this.isRestoringState = true;
    this.minutesData.loadClubsConfig().subscribe({
      next: (config) => {
        this.clubs = config.clubs;
        if (this.clubs.length > 0) {
          // Priority: URL param > localStorage > first club
          let targetClub: Club | undefined;

          if (urlClubId) {
            targetClub = this.clubs.find(c => c.id === urlClubId);
          }

          if (!targetClub) {
            const savedClubId = localStorage.getItem('selectedClubId');
            targetClub = savedClubId
              ? this.clubs.find(c => c.id === savedClubId)
              : undefined;
          }

          targetClub = targetClub || this.clubs[0];
          this.selectClub(targetClub, urlMinutesUrl);
        }
        this.isRestoringState = false;
      },
      error: (err) => {
        console.error('Error loading clubs config:', err);
        this.error = true;
        this.isRestoringState = false;
      }
    });
  }

  selectClub(club: Club, urlMinutesUrl?: string) {
    this.currentClub = club;
    localStorage.setItem('selectedClubId', club.id);
    this.loadIndex(club.minutesIndexUrl, urlMinutesUrl);
  }

  loadIndex(indexUrl: string, urlMinutesUrl?: string) {
    this.minutesData.loadIndex(indexUrl).subscribe({
      next: (index) => {
        this.availableMinutes = index.minutes;
        this.filterMinutesByType();

        // Find specific minutes file from URL or use first
        let targetFile: MinutesFile | undefined;
        if (urlMinutesUrl) {
          targetFile = this.filteredMinutes.find(f => f.url === urlMinutesUrl);
        }
        targetFile = targetFile || this.filteredMinutes[0];

        if (targetFile) {
          this.loadMinutesFile(targetFile);
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
        this.updateUrl();
      },
      error: (err) => {
        console.error('Error loading minutes:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  updateUrl() {
    if (this.isRestoringState) return;

    const queryParams: any = {};

    if (this.currentClub) {
      queryParams.club = this.currentClub.id;
    }

    if (this.currentFile) {
      queryParams.type = this.selectedMinutesType;
      queryParams.minutes = this.currentFile.url;
    }

    if (this.expandedPanels.size > 0) {
      queryParams.expanded = Array.from(this.expandedPanels).join(',');
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      replaceUrl: true
    });
  }

  onPanelToggle(panelId: string, opened: boolean) {
    if (opened) {
      this.expandedPanels.add(panelId);
    } else {
      this.expandedPanels.delete(panelId);
    }
    this.updateUrl();
  }

  isPanelExpanded(panelId: string): boolean {
    return this.expandedPanels.has(panelId);
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
    markdown += `| Name | Call Sign | Role | Notes |\n`;
    markdown += `|------|-----------|------|---------|\n`;
    this.minutes.attendees.forEach(attendee => {
      const notes = attendee.notes && attendee.notes.length > 0
        ? attendee.notes.map((note, index) => `${index + 1}. ${note}`).join('<br>')
        : '';
      markdown += `| ${attendee.firstName} | ${attendee.callSign} | ${attendee.role} | ${notes} |\n`;
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
    this.minutes.presidentReport.forEach((item, index) => {
      markdown += `${index + 1}. ${item}\n`;
    });
    markdown += `\n`;

    // Vice President's Report
    markdown += `## Vice President's Report\n\n`;
    this.minutes.vicePresidentReport.forEach((item, index) => {
      markdown += `${index + 1}. ${item}\n`;
    });
    markdown += `\n`;

    // Committee Reports
    markdown += `## Committee Reports\n\n`;
    this.minutes.committeeReports.forEach(report => {
      markdown += `### ${report.committeeName}\n`;
      markdown += `**Reported by:** ${report.reportedBy}\n\n`;
      report.report.forEach((item, index) => {
        markdown += `${index + 1}. ${item}\n`;
      });
      markdown += `\n`;
    });

    // Old Business
    markdown += `## Old Business\n\n`;
    this.minutes.oldBusiness.forEach((item, index) => {
      markdown += `${index + 1}. ${item}\n`;
    });
    markdown += `\n`;

    // New Business
    markdown += `## New Business\n\n`;
    this.minutes.newBusiness.forEach((item, index) => {
      markdown += `${index + 1}. ${item}\n`;
    });
    markdown += `\n`;

    // Announcements
    markdown += `## Announcements\n\n`;
    this.minutes.announcements.forEach((item, index) => {
      markdown += `${index + 1}. ${item}\n`;
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
