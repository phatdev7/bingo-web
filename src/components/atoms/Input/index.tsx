import React, { InputHTMLAttributes } from 'react';
import { Main, Content, ErrorText } from './styled';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<IProps> = props => {
  return (
    <Main>
      <fieldset style={{ borderColor: props.error ? 'red' : 'rgba(0, 0, 0, 0.15)' }}>
        <legend style={{ color: props.error ? 'red' : 'rgba(0, 0, 0, 0.5)' }}>
          {props.label}
        </legend>
        <Content {...props}></Content>
      </fieldset>
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </Main>
  );
};

export default Input;
