import React from 'react';
import { Route } from 'react-router';
import Layout from './views/Layout';
import Todos from './views/Todos';

const routes = (
  <Route path="/" component={Layout}>
    <Route path="todos" component={Todos}/>
  </Route>
);

export default routes;
