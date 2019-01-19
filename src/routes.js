import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import NewPost from './components/NewPost';
import Dashboard from './components/Dashboard';

export default
<Switch>
    <Route exact path='/' component={Home} />
    <Route path='/user' component={User} />
    <Route path='/dashboard/:username' component={Dashboard} />
    <Route path='/newpost' component={NewPost} />
</Switch>