import styled from 'styled-components';

const Main = styled('div')`
  position: relative;
  padding-bottom: 24px;
  fieldset {
    padding: 0 6px 6px 6px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    height: 40px;
    border-radius: 4px;
  }
  legend {
    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    font-weight: 500;
  }
`;

const Content = styled('input')`
  width: 100%;
  outline: none;
  border: none;
`;

const ErrorText = styled('div')`
  position: absolute;
  bottom: 0;
  color: red;
  margin-left: 6px;
  font-size: 12px;
  margin-bottom: 6px;
`;

export { Main, Content, ErrorText };
