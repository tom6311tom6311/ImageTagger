import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home.component';
import Tagger from '../Tagger/Tagger.component';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tagger" component={Tagger} />
    </Switch>
  </main>
);

export default Main;
