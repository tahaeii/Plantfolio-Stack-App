// src/app/services/log-viewer.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';


@Injectable({ providedIn: 'root' })
export class LogViewerService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://87.236.166.126/logs', {
      transports: ['polling', 'websocket'],
    });
  }

  public getMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('log', (data: any) => {
        observer.next(data);
      });

      this.socket.on('connect', () => {
        console.log('✅ Connected to Socket.IO server');
      });

      this.socket.on('disconnect', () => {
        console.warn('⚠️ Disconnected from Socket.IO server');
      });

      this.socket.on('connect_error', (err) => {
        console.error('❌ Connection error:', err);
      });
    });
  }
}


