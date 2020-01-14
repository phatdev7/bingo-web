import styled from 'styled-components';

const Main = styled('div')`
  position: relative;
  height: 46px;
`;

const Content = styled('button')`
  position: absolute;
  width: 100%;
  height: 42px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1fc2ff;
  font-size: 18px;
  font-weight: 600;
  color: white;
  outline: none;
  border: none;
`;

const Press = styled('div')`
  z-index: -1;
  position: absolute;
  top: 4px;
  width: 100%;
  height: 42px;
  border-radius: 12px;
  background-color: #1aa8eb;
`;

export { Main, Content, Press };
