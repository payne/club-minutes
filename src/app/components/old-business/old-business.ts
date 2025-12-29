import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-old-business',
  imports: [CommonModule, MatCardModule],
  templateUrl: './old-business.html',
  styleUrl: './old-business.css',
})
export class OldBusiness {
  @Input() items: string[] = [];
}
