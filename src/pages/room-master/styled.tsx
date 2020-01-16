import styled from 'styled-components';

const Main = styled('div')`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopContent = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Actions = styled('div')`
  display: flex;
  flex-direction: row;
`;

const FormDiv = styled('div')`
  display: flex;
  flex-direction: column;
`;

const Member = styled('div')`
  width: 100%;
  height: calc(100vh - 310px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 20px;
`;

const MemberItem = styled('div')`
  display: flex;
  margin-bottom: 12px;

  & > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #eee;
    margin-right: 12px;
  }
`;

const MemberName = styled('div')``;

export { Main, TopContent, Actions, FormDiv, Member, MemberItem, MemberName };
