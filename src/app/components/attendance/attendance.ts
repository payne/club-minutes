import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Attendee } from '../../models/minutes.model';

@Component({
  selector: 'app-attendance',
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class Attendance {
  @Input() attendees: Attendee[] = [];
  displayedColumns: string[] = ['name', 'callSign', 'role', 'arrivalTime', 'departureTime'];
}
