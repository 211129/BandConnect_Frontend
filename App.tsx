import React from 'react';
import { Provider } from 'react-redux';
import store from './src/shared/infrastructure/redux/store';
import MainNavigator from './src/shared/infrastructure/ui/navigation/MainNavigator';
import './config/firebase.config'; 

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
