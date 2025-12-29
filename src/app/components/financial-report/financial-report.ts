import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FinancialReport as FinancialReportModel } from '../../models/minutes.model';

@Component({
  selector: 'app-financial-report',
  imports: [CommonModule, MatCardModule],
  templateUrl: './financial-report.html',
  styleUrl: './financial-report.css',
})
export class FinancialReport implements OnInit {
  @Input() financialData!: FinancialReportModel;
  sparklinePoints: string = '';

  ngOnInit() {
    if (this.financialData?.balanceHistory) {
      this.generateSparkline();
    }
  }

  generateSparkline() {
    const data = this.financialData.balanceHistory || [];
    if (data.length === 0) return;

    const width = 100;
    const height = 30;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    this.sparklinePoints = points;
  }
}
