import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CommitteeReport } from '../../models/minutes.model';

@Component({
  selector: 'app-committee-reports',
  imports: [CommonModule, MatCardModule],
  templateUrl: './committee-reports.html',
  styleUrl: './committee-reports.css',
})
export class CommitteeReports {
  @Input() reports: CommitteeReport[] = [];
}
