import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Bed from './pages/Bed';
import History from './pages/history';

const Routes = () => {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/beds/:id" component={Bed} />
          <Route path="/history/:name" component={History} />
          {/* <Route path="/reports" component={History} /> */}
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Routes;
  