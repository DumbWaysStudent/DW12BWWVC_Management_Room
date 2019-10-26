import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './src/screens/Login';

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

// const signedIn = createStackNavigator(
//   {
//     Home: {
//       screen: ForYou,
//       title: 'ForYou',
//       navigationOptions: {header: null},
//     },
//   },
//   {
//     initialRouteName: 'ForYou',
//   },
// );

const Switch = createSwitchNavigator(
  {
    // signedIn: signedIn,
    signedOut: signedOut,
  },
  {
    initialRouteName: 'signedOut',
  },
);

export default createAppContainer(Switch);
