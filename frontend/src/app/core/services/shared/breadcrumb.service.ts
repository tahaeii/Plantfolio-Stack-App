import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { Breadcrumb } from '../../models/shared/breadcrumb.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  // Defines A BehaviorSubject To Hold The Breadcrumbs Data
  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);

  // Creates An Observable Stream For Breadcrumbs Updates
  breadcrumbs$ = this.breadcrumbs.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Listens For Navigation Events And Updates Breadcrumbs On Navigation End
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Generates The Breadcrumbs Based On The Current Route
      const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      // Updates The BehaviorSubject With The New Breadcrumbs Data
      this.breadcrumbs.next(breadcrumbs);
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    // Checks If The Current Route Has Breadcrumb Data Configured
    if (route.routeConfig && route.routeConfig.data && route.routeConfig.data['breadcrumb']) {
      // Retrieves The Breadcrumb Label From The Route Data
      const label = route.routeConfig.data['breadcrumb'];
      // Constructs The URL Path For The Breadcrumb Item
      const path = route.routeConfig.path ? `/${route.routeConfig.path}` : '';
      url += path;
      // Adds The Breadcrumb Item To The Breadcrumbs List
      breadcrumbs.push({ label, url });
    }

    // Recursively Processes The Child Route If It Exists
    if (route.firstChild) {
      return this.createBreadcrumbs(route.firstChild, url, breadcrumbs);
    }

    // Returns The Final Breadcrumbs Array
    return breadcrumbs;
  }

}
