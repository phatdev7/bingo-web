import React, { useState, useEffect, useRef, EventHandler } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Main } from './styled';
import { Container } from 'components/grid';

const NotFound: React.FC = props => {
  return (
    <Container>
      <Main>Page Not Found</Main>
    </Container>
  );
};

export default NotFound;
