import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, SplitButtonModule, InputTextModule, ButtonModule, InputIconModule, IconFieldModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild('navdrop') navdrop: ElementRef | undefined;
  fullscreen: boolean = false;
 
  handleClick(){
    this.navdrop?.nativeElement.classList.toggle("visibility");
  }
  toggleFullscreen() {
    let elem =  document.body; 
    let methodToBeInvoked = elem.requestFullscreen;
    if(!this.fullscreen) {
      methodToBeInvoked.call(elem);
      this.fullscreen = true;
    }
    else{
      document.exitFullscreen();
      this.fullscreen = false;
    }
  }
}
