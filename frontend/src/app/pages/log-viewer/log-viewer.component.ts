// src/app/components/log-viewer/log-viewer.component.ts
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LogViewerService } from 'src/app/core/services/utils/log-viewer.service';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.css']
})
export class LogViewerComponent implements OnInit {
  logs: any[] = [];

  constructor(private logSocket: LogViewerService) { }

  ngOnInit() {
    this.logSocket.getMessages().subscribe(data => {
      this.logs.unshift(data);
    });
  }
}
