import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Login from '../screens/Login';


const Drawer = createDrawerNavigator();

const DraweNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName='Login' screenOptions={{
      headerShown:false
    }}>
      <Drawer.Screen name="Login" component={Login}  options={{
        header:()=>null,
       
       
      }}/>
      <Drawer.Screen name="Home" component={Home} 
        options={{
          title:"Home page",
        }}

      />
    </Drawer.Navigator>
  );
};

export default DraweNavigation;
