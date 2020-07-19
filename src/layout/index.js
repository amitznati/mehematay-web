import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {DayTimes} from '../screens';
import AppBar from '../components/AppBar/AppBar';
// import Layout from './layout';
// import Navigation from './Navigation';
// import {AppBar} from 'az-ui-library';
import * as logo from '../styles/assets/ic_launcher_round.png';

const NearestPray = () => (<div>Nearest Pray</div>);
const About = () => (<div>About</div>);
const Home = () => (<div>Home</div>);

const routes = [
  { title: 'מאימתי', to: '/', component: Home},
  { title: 'זמני היום', to: '/day-times', component: DayTimes },
  { title: 'תפילה קרובה', to: '/nearest-pray', component: NearestPray },
  { title: 'אודות', to: '/about', component: About }
];
const navigationLinks = routes.map(({title, to}) => ({
  title, to
}));
export const Index = () => {
  return (
    <Router>
      <nav>
        <AppBar navigationLinks={navigationLinks} logoSrc={logo} title="זמני היום" />
      </nav>
      <main>
        <Switch>
          {routes.map(route => (<Route key={route.to} exact path={route.to} component={ route.component } />))}
        </Switch>
      </main>
    </Router>
  );
};

export default Index;
