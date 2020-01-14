import socketIO from 'socket.io-client';
import RegisterHandlers from './RegisterHandlers';
import SendData from './SendData';
import { API_HOST } from 'constant';

class SocketService {
  socket: any;
  constructor() {
    this.socket = null;
  }

  init = (path: string, callback?: Function) => {
    this.socket = socketIO(API_HOST, {
      path,
      timeout: 10000,
      jsonp: false,
      transports: ['websocket'],
      autoConnect: true,
      agent: '-',
      pfx: '-',
      cert: '-',
      ca: '-',
      ciphers: '-',
    });

    this.socket.on('connect', () => {
      RegisterHandlers(this.socket);
      if (callback) callback();
    });
  };

  makeSendData = (cmd: string) => {
    return new SendData(cmd);
  };

  send = (sendData: SendData) => {
    this.socket.emit(sendData.getCmd(), sendData.getParams());
  };

  register = (cmd: string, callback: Function) => {
    this.socket.on(cmd, callback);
  };

  destroy = () => {
    if (this.socket) {
      this.socket.close();
      this.socket.disconnect();
      this.socket = null;
    }
  };
}

export default new SocketService();
