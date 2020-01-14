import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import SocketService from 'services/SocketService';
import Home from 'pages/home';
import RoomMaster from 'pages/room-master';

interface IProps {
  accessToken: (callback: Function) => void;
}

const App: React.FC<IProps> = props => {
  const [done, setDone] = useState(false);
  useEffect(() => {
    props.accessToken((err: any, token: string) => {
      if (!err) {
        SocketService.init('/bingo', () => {
          setDone(true);
        });
      }
    });
  });

  if (!done) {
    return null;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/room-master">
          <RoomMaster />
        </Route>
      </Switch>
    </Router>
  );
};

const mapDispatch = (dispatch: any) => ({
  accessToken: (callback: Function) =>
    dispatch({
      type: 'WATCH_ACCESS_TOKEN',
      callback,
    }),
});

export default connect(null, mapDispatch)(App);
