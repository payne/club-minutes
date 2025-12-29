import { Component } from '@angular/core';
import { MinutesContainer } from './components/minutes-container/minutes-container';

@Component({
  selector: 'app-root',
  imports: [MinutesContainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Club Minutes';
}
