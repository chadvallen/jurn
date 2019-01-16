import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';

export default
<Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/user' component={User}/>
</Switch>