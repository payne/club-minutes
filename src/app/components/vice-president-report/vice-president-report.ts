import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-vice-president-report',
  imports: [CommonModule, MatCardModule],
  templateUrl: './vice-president-report.html',
  styleUrl: './vice-president-report.css',
})
export class VicePresidentReport {
  @Input() report: string = '';
}
