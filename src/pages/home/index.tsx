import React, { useState, useEffect, useRef, EventHandler } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Main, Content, FormDiv, RoomItem, FieldRow, RoomStatus } from './styled';
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
  user: {
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
        props.addCurrentRoom(values, () => {
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
            title: {
              value: '',
              validate: [{ isRequired: true, message: 'Title is required' }],
            },
            num_of_column: {
              value: '',
              validate: [{ isRequired: true, message: 'Column is required' }],
            },
            num_of_row: {
              value: '',
              validate: [{ isRequired: true, message: 'Row is required' }],
            },
            num_of_win: {
              value: '',
              validate: [{ isRequired: true, message: 'Win is required' }],
            },
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
              <FieldRow>
                <Input
                  label={'Column'}
                  value={form['num_of_column'].value}
                  error={form['num_of_column'].error}
                  onChange={setFormKeys['num_of_column']}
                />
                <Input
                  label={'Row'}
                  value={form['num_of_row'].value}
                  error={form['num_of_row'].error}
                  onChange={setFormKeys['num_of_row']}
                />
                <Input
                  label={'Win'}
                  value={form['num_of_win'].value}
                  error={form['num_of_win'].error}
                  onChange={setFormKeys['num_of_win']}
                />
              </FieldRow>
              <Button onClick={onCreate}>Create</Button>
            </FormDiv>
          )}
        </Form>
        <Content>
          {props.room.current.map((item: any) => (
            <RoomItem key={item._id} value={item._id} onClick={gotoRoom}>
              <div>
                <span>{item.title}</span>
                <RoomStatus>
                  <div>Status: {item.status}</div>
                  <div>Column: {item.num_of_column}</div>
                  <div>Row: {item.num_of_row}</div>
                  <div>Win: {item.num_of_win}</div>
                </RoomStatus>
              </div>
            </RoomItem>
          ))}
        </Content>
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
  addCurrentRoom: (values: any, callback: Function) =>
    dispatch({
      type: 'WATCH_ADD_CURRENT_ROOM',
      payload: values,
      callback,
    }),
});

export default connect(mapState, mapDispatch)(Home);
