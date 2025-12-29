import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MinutesApproval as MinutesApprovalModel } from '../../models/minutes.model';

@Component({
  selector: 'app-minutes-approval',
  imports: [CommonModule, MatCardModule],
  templateUrl: './minutes-approval.html',
  styleUrl: './minutes-approval.css',
})
export class MinutesApproval {
  @Input() approval!: MinutesApprovalModel;
}
