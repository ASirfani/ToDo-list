import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/Splash';
import BottomNavigation from './BottomNavigation';
import Task from '../screens/Task';
import Camera from '../screens/Camera';
const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='Splash'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#C4BFBB'
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: 'bold'
        },
      }} >
      <Stack.Screen name="Splash" component={Splash} options={{
        headerShown: false
      }} />
      <Stack.Screen name="My Task" component={BottomNavigation} options={{
        headerBackImage: () => null,
      }} />
      <Stack.Screen name="Task" component={Task} />
      <Stack.Screen name="Camera" component={Camera} options={{
        header: () => null,
      }} />

    </Stack.Navigator>
  );
};

export default StackNavigation;
