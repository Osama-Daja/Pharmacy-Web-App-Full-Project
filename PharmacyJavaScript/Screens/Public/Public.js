import React from 'react';
import {Text,View} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
const PublicStack = createStackNavigator();

import LogIn from './LogIn';
import Register from './Register';

const Public = () =>{
  console.log('[Public] Rerender');

  return (
    <PublicStack.Navigator >
      <PublicStack.Screen options={{headerShown: false}} name = "LogIn" component={LogIn} />
      <PublicStack.Screen options={{headerShown: false}} name = "Register" component={Register} />
    </PublicStack.Navigator>
  )
}

export default Public;
