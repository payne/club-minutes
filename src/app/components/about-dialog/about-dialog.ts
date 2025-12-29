import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-about-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './about-dialog.html',
  styleUrl: './about-dialog.css',
})
export class AboutDialog {}
