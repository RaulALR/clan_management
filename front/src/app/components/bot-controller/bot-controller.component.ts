import { Component } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bot-controller',
  imports: [CommonModule, FormsModule, RouterModule, MaterialModule],
  providers: [WebSocketService],
  templateUrl: './bot-controller.component.html',
  styleUrl: './bot-controller.component.scss'
})
export class BotControllerComponent {
  botName = "test";
  command = "";

  constructor(private wsService: WebSocketService) {}

  fileName: string = '';

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileName = input.files[0].name;
      // this.sendCommand()
    }
  }
  updateMembers(){
    this.wsService.sendCommand('getMember', 'get_members')
  }

  sendCommand() {
    this.wsService.sendCommand(this.botName, this.command);
  }
}
