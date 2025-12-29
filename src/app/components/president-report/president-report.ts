import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-president-report',
  imports: [CommonModule, MatCardModule],
  templateUrl: './president-report.html',
  styleUrl: './president-report.css',
})
export class PresidentReport {
  @Input() report: string[] = [];
}
