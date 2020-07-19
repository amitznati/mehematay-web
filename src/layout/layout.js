import React from 'react';
import Navigation from './Navigation';


function Layout(props) {
  const {children} = props;
  return (
    <div>
      <Navigation/>
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;
