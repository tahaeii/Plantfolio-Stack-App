import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/logs', cors: true })
export class LogGateway {
  @WebSocketServer()
  server: Server;

  emitLog(payload: any) {
    this.server.emit('log', payload);
  }
}
