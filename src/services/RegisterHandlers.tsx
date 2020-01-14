import Commands from './Commands';
import SocketIOClient from 'socket.io-client';

interface IParams {
  error: string;
}

export default (socket: SocketIOClient.Socket) => {
  socket.on(Commands.joinRoom, (params: IParams) => {
    console.log(params.error);
  });
};
