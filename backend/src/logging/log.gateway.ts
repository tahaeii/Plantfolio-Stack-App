import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/logs', cors: { orogin: '*' } })
export class LogGateway implements OnGatewayConnection,OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.server.emit('connected',{
      message:`User ${client.id} Connected!`
    })
  }

  handleDisconnect(client: Socket) {
    this.server.emit('disconnected',{
      messgae:`User ${client.id} disconnected!`
    })
  }

  handleLog(logInfo: any) {
    this.server.emit('log', logInfo);
  }
}
