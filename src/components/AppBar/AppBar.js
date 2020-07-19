import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './AppBar.scss';
import NavigationLink from '../NavigationLink/NavigationLink';
import Navigation from '../Navigation/Navigation';

const AppBar = ({ logoSrc, navigationLinks }) => {
  const [navigationClass, setNavigationClass] = React.useState('');
  const myScrollFunc = () => {
    setNavigationClass(window.scrollY > 160 ? 'shown' : '');
  };
  React.useEffect(() => {
    window.addEventListener('scroll', myScrollFunc);
    return () => window.removeEventListener('scroll', myScrollFunc);
  });
  return (
    <div className="app-bar">
      <div className="app-bar__icon">
        <img src={logoSrc} className="app-bar__icon--image" alt="logo" />
      </div>
      <Switch>
        {navigationLinks.map(route => (
          <Route key={route.to} exact path={route.to} >
            <h1 className="app-bar__page-title">{route.title}</h1>
          </Route>
        ))}
      </Switch>
      <div className="app-bar__navigation-links">
        {navigationLinks.map((link) => (
          <NavigationLink
            key={link.title}
            size="small"
            className="app-bar__navigation-links--link"
            linkTo={link.to}
            active={link.active}
          >
            {link.title}
          </NavigationLink>
        ))}
      </div>
      <Navigation
        className={navigationClass}
        navigationLinks={navigationLinks}
      />
    </div>
  );
};

export default React.memo(AppBar);
