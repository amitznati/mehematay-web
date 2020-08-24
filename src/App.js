import React from 'react';
import {Provider} from 'react-redux';
import {CssBaseLine, ThemeProvider} from 'az-ui-library';

import {getStoreInstance, getInstance} from './sdk';
import Layout from './layout';
import Spinner from './commonComponents/Spinner';


const store = getStoreInstance();
if (process.env && process.env.NODE_ENV) {
  window.mehematay = {
    sdkInstance: getInstance(),
    store,
  };
}

const theme = {
  colors: {
    primary: '#8e3032',
    primaryDark: '#4b191a',
    primaryLight: '#9c6364',

    secondary: '#debb0b',
    secondaryDark: '#675603',
    secondaryLight: '#dbc76a',

    tertiary: '#79d239',
    tertiaryDark: '#2d6107',
    tertiaryLight: '#caecb3',
  }
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseLine />
        <Layout />
        <Spinner />
      </ThemeProvider>
    </Provider>
  );
}
