import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb/breadcrumb.component";
import { PrimeNGConfig } from 'primeng/api';
import { Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SideMenuComponent, BreadcrumbComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  showBasicNavigation = true;
  private readonly destroy$ = new Subject<void>();
  
  constructor(private primengConfig: PrimeNGConfig, private router: Router){}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.router.events.pipe(
      takeUntil(this.destroy$),
      tap((event) => {
        if (event instanceof NavigationEnd) {
          const excludedRoutes = [
            '/', 
            '/change-password', 
            '/register-sp', 
            '/register-eo', 
            '/register-au', 
            '/edit-sp', 
            '/edit-eo', 
            '/edit-au'
          ];
    
          const currentUrl = event.urlAfterRedirects;
          const currentFullUrl = typeof window !== 'undefined' 
          ? window.location.href 
          : '';
    
          this.showBasicNavigation = 
            !excludedRoutes.includes(currentUrl) && 
            !currentFullUrl.includes('inviteToken=');
        }
      })
    ).subscribe();
  }

  title = 'EventPlanner';
}
