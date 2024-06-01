import { Component, inject } from '@angular/core';
import { TelegramService } from './services/telegram.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tg-app';

  telegram = inject(TelegramService);
  constructor() {
    this.telegram.ready();
  }
  
}
