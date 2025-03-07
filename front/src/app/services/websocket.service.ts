import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.websocketUrl);
  }

  sendCommand(botName: string, command: string) {
    this.socket.emit("sendCommand", { botName, command });

    this.socket.on('commandResponse', (data) => {
        console.log("✅ Respuesta del bot:", data.response);
    });
  }
  
}
