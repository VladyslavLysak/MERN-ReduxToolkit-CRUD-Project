import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import Home from 'Pages/Home';
import MoviePage from 'Pages/MoviePage';
import NotFoundPage from 'Pages/NotFoundPage';

import MainWrapper from 'Components/wrappers/MainWrapper';

const App = () => {
  return (
    <MainWrapper>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movie/:id" component={MoviePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </MainWrapper>
  );
}

export default App;
