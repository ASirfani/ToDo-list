import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Done from '../screens/Done';
import ToDo from '../screens/ToDo'
const Bottom = createBottomTabNavigator();

const BottomNavigation = () => {
  return (

    <Bottom.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focus, size, color }) => {
            let iconName;
            if (route.name === 'To-Do') {
              iconName = "list-ul";
            } else if (route.name === 'Done') {
              iconName = "calendar-check"
            }
            return (<Icon name={iconName} size={focus ? 25 : 20} color={color} />)
          },

          tabBarActiveTintColor: '#939190' ,
          tabBarInactiveTintColor: '#fff',
          tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' },
          tabBarStyle:{
            backgroundColor:'#C4BFBB',
          }
        })

      }
    >
      <Bottom.Screen name='To-Do' component={ToDo}
        options={{ header: () => null }} />
      <Bottom.Screen name='Done' component={Done}
        options={{ header: () => null }}
      />
    </Bottom.Navigator>


  )
}

export default BottomNavigation;