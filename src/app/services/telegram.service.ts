import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

// интерфейс для функционала кнопок
interface TgButton {
  show(): void;
  hide(): void;
  setText(text: string): void;
  onClick(fn: Function): void;
  offClick(fn: Function): void;
  enable(): void;
  disable(): void;
}

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private window: any;
  tg: any;

  constructor(@Inject(DOCUMENT) private _document: any) {
    this.window = this._document.defaultView;
    if (this.window && this.window.Telegram && this.window.Telegram.WebApp) {
      this.tg = this.window.Telegram.WebApp;
    } else {
      console.error('Telegram WebApp is not available');
    }
  }

  get MainButton(): TgButton {
    if (this.tg) {
      return this.tg.MainButton;
    }
    throw new Error('Telegram WebApp is not available');
  }

  get BackButton(): TgButton {
    if (this.tg) {
      return this.tg.BackButton;
    }
    throw new Error('Telegram WebApp is not available');
  }

  sendData(data: object) {
    if (this.tg) {
      this.tg.sendData(JSON.stringify(data));
    } else {
      console.error('Telegram WebApp is not available');
    }
  }

  ready() {
    if (this.tg) {
      this.tg.ready();
    } else {
      console.error('Telegram WebApp is not available');
    }
  }
}
