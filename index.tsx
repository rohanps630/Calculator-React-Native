import React from 'react';
import { Provider } from 'react-redux';
import App from './src/App';
import { store } from './src/store';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

const Main = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
