import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';

import store from './src/redux/_store/store';
import Login from './src/screens/Login';
import Rooms from './src/screens/Rooms';
import Customers from './src/screens/Customers';
import CheckIn from './src/screens/CheckIn';

const signedOut = createStackNavigator(
  {
    Login: {
      screen: Login,
      title: 'Login',
      navigationOptions: {header: null},
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const signedIn = createStackNavigator(
  {
    Rooms: {
      screen: Rooms,
      title: 'Rooms',
      navigationOptions: {header: null},
    },
    Customers: {
      screen: Customers,
      title: 'Customers',
      navigationOptions: {header: null},
    },
    CheckIn: {
      screen: CheckIn,
      title: 'CheckIn',
      navigationOptions: {header: null},
    },
  },
  {
    initialRouteName: 'Rooms',
  },
);

const Switch = createSwitchNavigator(
  {
    signedIn: signedIn,
    signedOut: signedOut,
  },
  {
    initialRouteName: 'signedOut',
  },
);

const AppContainer = createAppContainer(Switch);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
