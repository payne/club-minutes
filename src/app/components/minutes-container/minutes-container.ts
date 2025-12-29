import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MinutesData } from '../../services/minutes-data';
import { BoardMinutes } from '../../models/minutes.model';
import { Attendance } from '../attendance/attendance';
import { FinancialReport } from '../financial-report/financial-report';
import { MinutesApproval } from '../minutes-approval/minutes-approval';
import { PresidentReport } from '../president-report/president-report';
import { VicePresidentReport } from '../vice-president-report/vice-president-report';
import { CommitteeReports } from '../committee-reports/committee-reports';
import { OldBusiness } from '../old-business/old-business';
import { NewBusiness } from '../new-business/new-business';
import { Announcements } from '../announcements/announcements';

@Component({
  selector: 'app-minutes-container',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
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

  constructor(private minutesData: MinutesData) {}

  ngOnInit() {
    this.loadMinutes();
  }

  loadMinutes() {
    this.loading = true;
    this.error = false;
    this.minutesData.loadMinutes().subscribe({
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

  print() {
    window.print();
  }
}
