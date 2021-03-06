import { Component } from '@angular/core';

@Component({
  selector: 'festival-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {
    const scale = document.documentElement.clientWidth / 750;
    // 动态设置html的font-size
    const HTML: HTMLHtmlElement | null = document.querySelector('html');
    HTML && (HTML.style.fontSize = 100 * scale + 'px');
  }
}
