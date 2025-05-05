import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenLoaderService } from './screen-loader.service';

@Component({
  selector: 'app-screen-loader',
  templateUrl: './screen-loader.component.html',
  styleUrls: ['./screen-loader.component.css']
})
export class ScreenLoaderComponent implements OnInit {

  loading$ !: Observable<boolean>;
  constructor(private loadersrvc: ScreenLoaderService) {}
  
  ngOnInit(): void {
    this.loading$ = this.loadersrvc.loading$; // Subscribe to loading state
  }
}
