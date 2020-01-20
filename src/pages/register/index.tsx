import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Main, FormDiv } from './styled';
import Form from 'components/molecules/Form';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import { Container } from 'components/grid';
import { SECODARY } from 'constant';

interface IProps {
  register: (name: string, callback: Function) => void;
}

const Register: React.FC<IProps> = props => {
  const formRef: any = useRef(null);

  useEffect(() => {}, []);

  const onCreate = () => {
    formRef.current.submit((err: any, values: any) => {
      if (!err) {
        props.register(values.name, (err: any, user: any) => {
          // if (!err && user.token) {
          //   SocketService.init('/bingo', () => {
          //     props.navigation.navigate('App');
          //   });
          // }
        });
      }
    });
  };

  return (
    <Container>
      <Main>
        <Form
          ref={formRef}
          initialForm={{
            name: {
              value: '',
              validate: [{ isRequired: true, message: 'Name is required' }],
            },
          }}
        >
          {(form: any, setFormKeys: any) => (
            <FormDiv>
              <Input
                label={'NICK NAME'}
                value={form['name'].value}
                error={form['name'].error}
                onChange={setFormKeys['name']}
              />
              <Button style={{ backgroundColor: SECODARY }} onClick={onCreate}>
                Register
              </Button>
            </FormDiv>
          )}
        </Form>
      </Main>
    </Container>
  );
};

const mapState = (state: any) => ({
  user: state.user,
  room: state.room,
});

const mapDispatch = (dispatch: any) => ({
  register: (name: string, callback: Function) =>
    dispatch({
      type: 'WATCH_REGISTER',
      payload: name,
      callback,
    }),
});

export default connect(mapState, mapDispatch)(Register);
