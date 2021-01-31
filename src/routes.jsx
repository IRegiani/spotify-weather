import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Login from './pages/login';

const Routes = () => (
  <Switch>
    <Route exact path="/"><Redirect to="/login" /></Route>
    <Route path="/login" render={() => <Login />} />
    <Route path="*"><Redirect to="/login" /></Route>
  </Switch>
);

export default Routes;
