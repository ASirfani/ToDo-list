import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import StackNavigaton from './src/navigations/StackNavigation';
import { Store } from './src/redux/store';



const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <StackNavigaton />
      </NavigationContainer>
    </Provider>)
};

export default App;
