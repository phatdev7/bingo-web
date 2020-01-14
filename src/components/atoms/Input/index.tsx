import React, { InputHTMLAttributes } from 'react';
import { Main, Content, ErrorText } from './styled';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<IProps> = props => {
  return (
    <Main>
      <fieldset>
        <legend>{props.label}</legend>
        <Content {...props}></Content>
      </fieldset>
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </Main>
  );
};

export default Input;
