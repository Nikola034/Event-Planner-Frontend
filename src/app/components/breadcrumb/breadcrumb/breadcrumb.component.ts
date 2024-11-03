import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';
import { isUndefined, isNullOrUndefined } from 'is-what';
import { BreadcrumbModule } from 'primeng/breadcrumb';
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  readonly home = {icon: 'pi pi-home', url: '/',target:'_self'};
  menuItems!: MenuItem[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.menuItems = this.createBreadcrumbs(this.activatedRoute.root));
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): any {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
      const target = '_self';
      if (!isNullOrUndefined(label)) {
        breadcrumbs.push({label, url,target});
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}