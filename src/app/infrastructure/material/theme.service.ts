import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) { }
  private default: boolean = true;
  private lightTheme: string = 'material-light';
  private darkTheme: string = 'material-dark';
  changeTheme() {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (!themeLink) return;
    themeLink.href=this.default?this.lightTheme+'.css':this.darkTheme+'.css';
    this.default=!this.default;
  }

}
