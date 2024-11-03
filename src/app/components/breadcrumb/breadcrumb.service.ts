import { Injectable } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'is-what';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  constructor() { }
  public createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): any {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[this.ROUTE_DATA_BREADCRUMB];
      const target = '_self';
      if (!isNullOrUndefined(label)) {
        breadcrumbs.push({label, url,target});
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
