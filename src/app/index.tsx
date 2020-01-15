import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SocketService from 'services/SocketService';
import Register from 'pages/register';
import Home from 'pages/home';
import RoomMaster from 'pages/room-master';
import NotFound from 'pages/not-found';

interface IProps {
  accessToken: (callback: Function) => void;
  user: {
    token: string;
  };
}

const App: React.FC<IProps> = props => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    props.accessToken((err: any, user: any) => {
      if (!err && user.token) {
        SocketService.init('/bingo', () => {
          setStatus('app');
        });
      } else {
        setStatus('auth');
      }
    });
  }, [props.user.token]);

  if (status === 'auth') {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Register />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    );
  } else if (status === 'app') {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/room-master">
            <RoomMaster />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    );
  } else {
    return null;
  }
};

const mapState = (state: any) => ({
  user: state.user,
});

const mapDispatch = (dispatch: any) => ({
  accessToken: (callback: Function) =>
    dispatch({
      type: 'WATCH_ACCESS_TOKEN',
      callback,
    }),
});

export default connect(mapState, mapDispatch)(App);
