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
import { BoardMinutes, MinutesFile, Club } from '../../models/minutes.model';
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
        if (this.availableMinutes.length > 0) {
          this.loadMinutesFile(this.availableMinutes[0]);
        }
      },
      error: (err) => {
        console.error('Error loading index:', err);
        this.error = true;
      }
    });
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
}
