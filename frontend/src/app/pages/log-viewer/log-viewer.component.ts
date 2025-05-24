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
  getStatusClass(status: number): string {
    if (status >= 500) return 'error';
    if (status >= 400) return 'warn';
    return 'ok';
  }
  getMethodIcon(method: string): string {
    switch (method.toLowerCase()) {
      case 'get': return 'fas fa-download';
      case 'post': return 'fas fa-upload';
      case 'put': return 'fas fa-pencil-alt';
      case 'delete': return 'fas fa-trash-alt';
      default: return 'fas fa-question';
    }
  }

}
