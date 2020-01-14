import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Main, Content, FormDiv } from './styled';
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
  access_token: {
    token: string;
  };
}

interface IRoom {
  title: string;
}

const RoomMaster: React.FC<IProps> = props => {
  const [room, setRoom] = useState<IRoom>({ title: '' });
  const [code, setCode] = useState('');
  const [redirectURL, setRedirecURL] = useState('');

  useEffect(() => {
    const id = window.location.pathname.replace('/room-master/', '');

    REST.get(`room/${id}`).then(res => {
      setRoom(res.data);
    });
    REST.get(`room/${id}/current_code`)
      .then(res => {
        setCode(res.data);
      })
      .catch(err => {});

    // const sendData = SocketService.makeSendData(Commands.joinRoom);
    // sendData.addParam('room_id', id);
    // SocketService.send(sendData);

    SocketService.register(Commands.joinRoom, (params: any) => {
      if (!params.error) {
        // props.navigation.navigate('BingoCardScreen');
      }
    });
  }, []);

  if (redirectURL) {
    return <Redirect to={redirectURL} />;
  }

  return (
    <Container>
      <Main>
        <QRCode value={code} size={300} />
        <div>{room.title}</div>
        <Content></Content>
      </Main>
    </Container>
  );
};

const mapState = (state: any) => ({
  access_token: state.access_token,
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
