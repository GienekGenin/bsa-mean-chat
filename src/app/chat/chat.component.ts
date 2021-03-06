import {Component, OnInit} from '@angular/core';
import {SocketService} from '../services/socket/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: string[] = [];

  constructor(private _socketService: SocketService) {
  }

  ngOnInit() {
    this._socketService.emit('Client_asking', {
      msg: 'Client to server, can u hear me server?'
    });
    this._socketService.on('Server_asking', (data: any) => {
      console.log(data.msg);
      this._socketService.emit('Client_response', {
        msg: 'Yes, its working for me!'
      });
      this._socketService.on('Server_response', (_data: any) => {
        console.log(_data.msg);
      });
    });

    this._socketService.on('new_connection', (_data: any) => {
      this.messages = _data.messages;
    });
    this._socketService.on('new_message', (_data: any) => {
      this.messages.push(_data.msg);
    });
    this._socketService.on('clear', (_data: any) => {
      this.messages = [];
    });
  }

  sendMsg(msgInput, event) {
    if (msgInput.value === 'cls') {
      this._socketService.emit('clear', {
        msg: 'clear'
      });
      msgInput.value = '';
    }
    if (msgInput.value !== '' && event.key === 'Enter') {
      this._socketService.emit('new_message', {
        msg: msgInput.value
      });
      msgInput.value = '';
    }
  }
}
