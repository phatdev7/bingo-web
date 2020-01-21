import styled from 'styled-components';
import { PRIMARY } from 'constant';

const Main = styled('div')``;

const Header = styled('div')`
  height: 48px;
  background-color: ${PRIMARY};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;

  & > div {
    color: #fff;
    cursor: pointer;
  }
`;

const Content = styled('div')`
  margin: 20px;
`;

const FormDiv = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const RoomItem = styled('button')`
  border: none;
  width: 100%;
  outline: none;
  cursor: pointer;
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

const FieldRow = styled('div')`
  display: flex;
`;

const RoomStatus = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export { Main, Header, Content, FormDiv, RoomItem, FieldRow, RoomStatus };
