import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbService } from '../breadcrumb.service';
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  
  readonly home = {icon: 'pi pi-home', url: '/home',target:'_self'};
  menuItems!: MenuItem[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private breadcrumbService:BreadcrumbService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.menuItems = this.breadcrumbService.createBreadcrumbs(this.activatedRoute.root));
  }

  
}