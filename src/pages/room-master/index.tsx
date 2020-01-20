import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Main, TopContent, Actions, Member, MemberItem, MemberName } from './styled';
import Form from 'components/molecules/Form';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import { Container } from 'components/grid';
import SocketService from 'services/SocketService';
import Commands from 'services/Commands';
import QRCode from 'qrcode.react';
import REST from 'utils/api';

interface IProps {
  requestAccessToken: (callback: Function) => void;
  getCurrentRoom: () => void;
  user: {
    token: string;
  };
}

interface IRoom {
  _id: string;
  title: string;
}

interface IUser {
  name: string;
  token: string;
  index: string;
}

interface IGame {
  room_id: string;
}

let arr: any[] = [];

const RoomMaster: React.FC<IProps> = props => {
  const [room, setRoom] = useState<IRoom>();
  const [code, setCode] = useState('');
  const [members, setMembers] = useState<any>([]);
  const [redirectURL, setRedirecURL] = useState('');
  const [game, setGame] = useState<IGame>();
  const [countDown, setCountDown] = useState();

  useEffect(() => {
    const id = window.location.pathname.replace('/room-master/', '');

    REST.get(`room/${id}`).then(res => {
      setRoom(res.data);
    });

    REST.get(`room/${id}/current_code`)
      .then(res => {
        setCode(res.data);
      })
      .catch(err => {
        window.location.href = '/';
      });

    getTickets();

    const sendData = SocketService.makeSendData(Commands.joinRoom);
    sendData.addParam('room_id', id);
    sendData.addParam('user', props.user);
    SocketService.send(sendData);

    // SocketService.register(Commands.joinRoom, (params: any) => {
    //   if (params.error) {
    //     setRedirecURL('/');
    //   }
    // });

    SocketService.register(Commands.scanQRCode, (params: any) => {
      if (!params.error) {
        setCode(params.new_code);
        arr = [...arr, { ...params.user, index: params.new_code }];
        setMembers(arr);
      }
    });

    SocketService.register(Commands.createGame, (params: any) => {
      if (!params.error) {
        setGame(params.game);
      }
    });

    SocketService.register(Commands.countDownInitGame, (params: any) => {
      if (!params.error) {
        setCountDown(params.count_down);
        console.log(params.count_down);
      }
    });

    SocketService.register(Commands.dialGame, (params: any) => {
      if (!params.error) {
        setGame(params.game);
        console.log(params.game);
      }
    });
  }, []);

  const getTickets = () => {
    const id = window.location.pathname.replace('/room-master/', '');
    REST.get(`room/${id}/tickets`).then(res => {
      arr = res.data.map((item: any) => ({ ...item.user, index: item.current_code }));
      setMembers(arr);
    });
  };

  const startGame = () => {
    const id = window.location.pathname.replace('/room-master/', '');
    const sendData = SocketService.makeSendData(Commands.createGame);
    sendData.addParam('room_id', id);
    sendData.addParam('user', props.user);
    SocketService.send(sendData);
  };

  if (redirectURL) {
    return <Redirect to={redirectURL} />;
  }

  return (
    <Container>
      <Main>
        <TopContent>
          <QRCode value={code} size={180} />
          <div>{room && room.title ? room.title : ''}</div>
          <Actions>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
              <Button>Back Home</Button>
            </Link>
            <Button style={{ marginLeft: 12 }} onClick={startGame}>
              Start
            </Button>
            <Button style={{ marginLeft: 12 }} onClick={getTickets}>
              Refresh
            </Button>
          </Actions>
        </TopContent>
        <Member>
          {members.map((member: IUser) => (
            <MemberItem key={member.index}>
              <img src="https://cdn0.iconfinder.com/data/icons/avatar-15/512/ninja-512.png" />
              <MemberName>
                <span>{member.name}</span>
              </MemberName>
            </MemberItem>
          ))}
        </Member>
      </Main>
    </Container>
  );
};

const mapState = (state: any) => ({
  user: state.user,
  room: state.room,
});

const mapDispatch = (dispatch: any) => ({
  requestAccessToken: (callback: Function) =>
    dispatch({
      type: 'WATCH_ACCESS_TOKEN',
      callback,
    }),
  getCurrentRoom: () =>
    dispatch({
      type: 'WATCH_GET_CURRENT_ROOM',
    }),
});

export default connect(mapState, mapDispatch)(RoomMaster);
