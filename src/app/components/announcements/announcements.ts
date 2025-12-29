import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-announcements',
  imports: [CommonModule, MatCardModule],
  templateUrl: './announcements.html',
  styleUrl: './announcements.css',
})
export class Announcements {
  @Input() items: string[] = [];
}
