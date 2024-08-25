import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store'; // Adjust the import path if necessary
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
