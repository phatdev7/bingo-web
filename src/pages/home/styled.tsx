import styled from 'styled-components';

const Main = styled('div')`
  margin: 30px 0;
`;

const Content = styled('div')``;

const FormDiv = styled('div')`
  display: flex;
  flex-direction: column;
`;

const RoomItem = styled('button')`
  border: none;
  width: 100%;
  outline: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 6px 12px;
  margin-top: 20px;
  background-color: #eeeeee;
  box-shadow: 0px 12px 15px -12px rgba(0, 0, 0, 0.5);

  & > span:first-child {
    font-weight: bold;
  }

  & > span:last-child {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
  }
`;

export { Main, Content, FormDiv, RoomItem };
