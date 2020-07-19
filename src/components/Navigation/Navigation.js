import React from 'react';

import NavigationLink from '../NavigationLink/NavigationLink';
import './Navigation.scss';

const Navigation = ({
  navigationLinks,
  className
}) => {
  const [buttonClass, setButtonClass] = React.useState('');
  const [isNavigationShow, setIsNavigationShow] = React.useState(false);
  const toggleNavigation = () => {
    setIsNavigationShow(!isNavigationShow);
  };
  return (
    <div className={`navigation ${className}`}>
      <input type="checkbox" className="navigation__checkbox" id="navigation" checked={isNavigationShow} onChange={toggleNavigation} />
      <label
        htmlFor="navigation"
        onMouseOver={() => setButtonClass('hover')}
        onMouseLeave={() => setButtonClass('')}
        onTouchEnd={() => setButtonClass('')}
        className={`navigation__button ${buttonClass}`}
      >
        <span className="navigation__icon">&nbsp;</span>
      </label>
      <div className="navigation__bg">&nbsp;</div>
      <div className="navigation__nav">
        <ul className="navigation__list">
          {navigationLinks.map((link) => (
            <li key={link.title} className="navigation__item">
              <NavigationLink onClick={toggleNavigation} linkTo={link.to}>{link.title}</NavigationLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Navigation;
