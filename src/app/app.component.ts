import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RegisterOdFormComponent } from './components/register-od-form/register-od-form.component';
import { RegisterPupFormComponent } from './components/register-pup-form/register-pup-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { EventsComponent } from "./components/event/events/events.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent, SideMenuComponent, RegisterOdFormComponent, RegisterPupFormComponent, LoginFormComponent, EventsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EventPlanner';
}
