import styled from 'styled-components';

const Container = styled('div')`
  margin: auto;

  @media (min-width: 768px) {
    width: 700px;
  }
  @media (min-width: 992px) {
    width: 900px;
  }
  @media (min-width: 1200px) {
    width: 1040px;
  }
  @media (min-width: 1400px) {
    width: 1280px;
  }
`;

export { Container };
