import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommitteeReport } from '../../models/minutes.model';

@Component({
  selector: 'app-committee-reports',
  imports: [CommonModule, MatCardModule, MatExpansionModule],
  templateUrl: './committee-reports.html',
  styleUrl: './committee-reports.css',
})
export class CommitteeReports {
  @Input() reports: CommitteeReport[] = [];
}
