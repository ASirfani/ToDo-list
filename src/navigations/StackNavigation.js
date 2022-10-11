import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import About from '../screens/About';
import Camera from '../screens/Camera';
const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{
        header:()=>null
      }} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="About" component={About} options={{
        header:()=>null
      }} />
      <Stack.Screen name="Camera" component={Camera} options={{
        header:()=>null
      }} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
