import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Main, Member, MemberItem, MemberName } from './styled';
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
  title: string;
}

interface IUser {
  name: string;
  token: string;
  index: string;
}

const members: any[] = [];

const RoomMaster: React.FC<IProps> = props => {
  const [room, setRoom] = useState<IRoom>({ title: '' });
  const [code, setCode] = useState('');
  const [members2, setMembers] = useState<IUser[]>([]);
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

    const sendData = SocketService.makeSendData(Commands.joinRoom);
    sendData.addParam('room_id', id);
    sendData.addParam('user', props.user);
    SocketService.send(sendData);

    SocketService.register(Commands.joinRoom, (params: any) => {
      if (params.error) {
        setRedirecURL('/');
      }
    });

    SocketService.register(Commands.scanQRCode, (params: any) => {
      if (!params.error) {
        setCode(params.new_code);
        // setMembers([...members, { ...params.user, index: params.new_code }]);
        members.push({ ...params.user, index: params.new_code });
      }
    });
  }, []);

  if (redirectURL) {
    return <Redirect to={redirectURL} />;
  }
  console.log(members);

  return (
    <Container>
      <Link to={'/'}>Back Home</Link>
      <Main>
        <QRCode value={code} size={240} />
        <div>{room.title}</div>
        <Member>
          {members.map((member: IUser, index: number) => (
            <MemberItem key={member.index}>
              <img src="" />
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
