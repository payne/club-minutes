import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-new-business',
  imports: [CommonModule, MatCardModule],
  templateUrl: './new-business.html',
  styleUrl: './new-business.css',
})
export class NewBusiness {
  @Input() items: string[] = [];
}
