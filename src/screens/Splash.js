import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import GlobalStyle from '../utils/GlobalStyle';



const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(()=>{
      navigation.navigate('My Task');
    },2000)
    createChannel()
  }, []);

const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'task-channel',
      channelName: 'Task Channel'
    })
}



  return (
    <View style={styles.view}>
      <Image style={styles.logo} source={require('../asset/Logo/todo.png')} />
      <View style={styles.logincontent}>
        <Text style={[styles.txt,GlobalStyle.CustomFont]}>Unique To-Do List</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //   logo styles
  logo: {
    height: 170,
    width: 170,
  },

  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logincontent: {
    width: '80%',
    alignItems: 'center',
    marginTop: '4%',
  },

  txt: {
    fontSize: 25,
    textAlign: 'left',
  },

  txtInput: {
    backgroundColor: 'white',
    width: '80%',
    height: '17%',
    borderRadius: 15,
    fontSize: 20,
    paddingLeft: 20,
  },

  pressable: {
    width: '25%',
    height: '13%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
});

export default Splash;
