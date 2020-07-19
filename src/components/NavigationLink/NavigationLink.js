import React from 'react';

import './NavigationLink.scss';
import {NavLink} from 'react-router-dom';

const NavigationLink = ({
  linkTo,
  children,
  size = 'medium',
  rounded,
  // backgroundColor = 'transparent',
  // textColor = '#ffffff',
  // backgroundColorHover = '#ffffff',
  // textColorHover = '#8e3032',
  className,
  onClick
}) => {
  // const [isHover, setIsHover] = React.useState(false);
  const ref = React.useRef();
  // const customStyle = {
  //   color: isHover ? textColorHover : textColor,
  //   backgroundImage: `linear-gradient(120deg, ${backgroundColor} 0%, ${backgroundColor} 50%, ${backgroundColorHover} 51%)`
  // };
  const cls = [
    'navigation__link',
    size ? `navigation__link--${size}` : '',
    rounded ? 'navigation__link--rounded' : '',
    className
  ];
  return (
    <NavLink
      to={linkTo}
      className={cls.join(' ')}
      //style={customStyle}
      // onMouseOver={() => setIsHover(true)}
      // onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
      exact
      ref={ref}
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;
