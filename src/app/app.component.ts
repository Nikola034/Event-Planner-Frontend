import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RegisterOdFormComponent } from './components/register-od-form/register-od-form.component';
import { RegisterPupFormComponent } from './components/register-pup-form/register-pup-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { EventsComponent } from "./components/event/events/events.component";
import { MerchandiseComponent } from "./components/merchandise/merchandise/merchandise.component";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb/breadcrumb.component";
import { PrimeNGConfig } from 'primeng/api';
import { Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent, SideMenuComponent, RegisterOdFormComponent, RegisterPupFormComponent, LoginFormComponent, EventsComponent, MerchandiseComponent, BreadcrumbComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  showBasicNavigation = true;
  private readonly destroy$ = new Subject<void>();
  
  constructor(private primengConfig: PrimeNGConfig, private router: Router){}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.router.events.pipe(takeUntil(this.destroy$),tap((event) =>{
      if (event instanceof NavigationEnd) {
        // List of routes that should not show the navbar
        const excludedRoutes = ['/', '/register-od', '/register-pup'];

        // Check if the current route is in the list of excluded routes
        this.showBasicNavigation = !excludedRoutes.includes(event.urlAfterRedirects);
      }
    })).subscribe();
  }

  title = 'EventPlanner';
}
