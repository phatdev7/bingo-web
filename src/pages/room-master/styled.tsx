import styled from 'styled-components';

const Main = styled('div')`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormDiv = styled('div')`
  display: flex;
  flex-direction: column;
`;

const Member = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MemberItem = styled('div')`
  display: flex;

  & > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #eee;
    margin-right: 12px;
  }
`;

const MemberName = styled('div')``;

export { Main, FormDiv, Member, MemberItem, MemberName };
