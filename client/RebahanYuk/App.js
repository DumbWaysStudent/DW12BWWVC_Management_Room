import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './src/screens/Login';
import Rooms from './src/screens/Rooms';

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

export default createAppContainer(Switch);
