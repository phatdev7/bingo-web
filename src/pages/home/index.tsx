import React, { useState, useEffect, useRef, EventHandler } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Main, Content, FormDiv, RoomItem } from './styled';
import Form from 'components/molecules/Form';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import { Container } from 'components/grid';
import SocketService from 'services/SocketService';
import Commands from 'services/Commands';
import REST from 'utils/api';

interface IProps {
  requestAccessToken: (callback: Function) => void;
  getCurrentRoom: () => void;
  addCurrentRoom: (title: string, callback: Function) => void;
  access_token: {
    token: string;
  };
  room: {
    current: [];
  };
}

const Home: React.FC<IProps> = props => {
  const formRef: any = useRef(null);
  const [redirectURL, setRedirecURL] = useState('');

  useEffect(() => {
    props.getCurrentRoom();
  }, []);

  const onCreate = () => {
    formRef.current.submit((err: any, values: any) => {
      if (!err) {
        props.addCurrentRoom(values.title, () => {
          formRef.current.clearField('title');
        });
      }
    });
  };

  const gotoRoom = (e: any) => {
    setRedirecURL(`room-master/${e.currentTarget.value}`);
  };

  if (redirectURL) {
    return <Redirect to={redirectURL} />;
  }

  return (
    <Container>
      <Main>
        <Form
          ref={formRef}
          initialForm={{
            title: { value: '', validate: [{ isRequired: true, message: 'Title is required' }] },
          }}
        >
          {(form: any, setFormKeys: any) => (
            <FormDiv>
              <Input
                label={'Title'}
                value={form['title'].value}
                error={form['title'].error}
                onChange={setFormKeys['title']}
              />
              <Button onClick={onCreate}>Create</Button>
            </FormDiv>
          )}
        </Form>
        <Content>
          {props.room.current.map((item: any) => (
            <RoomItem key={item._id} value={item._id} onClick={gotoRoom}>
              <span>{item.title}</span>
              <span>Status: {item.status}</span>
            </RoomItem>
          ))}
        </Content>
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
  addCurrentRoom: (title: string, callback: Function) =>
    dispatch({
      type: 'WATCH_ADD_CURRENT_ROOM',
      payload: title,
      callback,
    }),
});

export default connect(mapState, mapDispatch)(Home);
