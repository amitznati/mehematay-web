import React from 'react';
import {Provider} from 'react-redux';

import {getStoreInstance, getInstance} from './sdk';
import Layout from './layout';
import Spinner from './commonComponents/Spinner';
import 'az-ui-library/dist/index.css';

const store = getStoreInstance();
if (process.env && process.env.NODE_ENV) {
  window.mehematay = {
    sdkInstance: getInstance(),
    store,
  };
}

export default function App() {
  //const classes = useStyles();
  return (
    <Provider store={store}>
      <Layout />
      <Spinner />
    </Provider>
  );
}
