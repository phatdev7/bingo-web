import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Main, FormDiv } from './styled';
import Form from 'components/molecules/Form';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import { Container } from 'components/grid';
import { SECODARY } from 'constant';

interface IProps {
  register: (name: string) => void;
}

const Register: React.FC<IProps> = props => {
  const formRef: any = useRef(null);

  const onCreate = () => {
    formRef.current.submit((err: any, values: any) => {
      if (!err) {
        props.register(values.name);
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
  register: (name: string) =>
    dispatch({
      type: 'WATCH_REGISTER',
      payload: name,
    }),
});

export default connect(mapState, mapDispatch)(Register);
