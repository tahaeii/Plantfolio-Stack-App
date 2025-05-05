import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/core/services/shared/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs$ = this.breadcrumbService.breadcrumbs$;

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {}
}
