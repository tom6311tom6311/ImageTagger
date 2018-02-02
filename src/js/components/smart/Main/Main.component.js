import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home.component';
import Tagger from '../Tagger/Tagger.component';
import FaceIdent from '../FaceIdent/FaceIdent.component';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tagger" component={Tagger} />
      <Route path="/face_ident" component={FaceIdent} />
    </Switch>
  </main>
);

export default Main;
