import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import { openDatabase } from 'react-native-sqlite-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setPassword } from '../redux/action';

const db = openDatabase({ name: 'as' });


const Login = ({ navigation }) => {

  const { name, password } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  // const [name, setname] = useState('')
  // const [password, setPassword] = useState('');

  useEffect(() => {
    createTable()
    createChannel()
    getData()
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS User(id INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR(20),Pass INTEGER)',
      );

    })

  }

  const createChannel =()=>{
    PushNotification.createChannel({
      channelId:'test-channel',
      channelName:'Test Channel'
    })
  }

  const getData = () => {
    db.transaction(
      tx => {
        tx.executeSql(
          "SELECT Name, Pass FROM User", [],
          (tx, results) => {
            var len = results.rows.length;
            console.log(len)
            if (len > 0) {
              navigation.navigate('About')
            }
          }, (error) => { console.log(error) }
        )
      }
    )

    // AsyncStorage.getItem('UserData').then(value => {
    //   if (value != null) {

    //     let user = JSON.parse(value);
    //     setName(user.Name)
    //     setPassword(user.Password)
    //   }
    // })

  }


  const setData = () => {

    if (name.length == 0 || password.length == 0) {
      Alert.alert('Warning!', 'Please write your name and Password')
    } else {
      dispatch(setName(name))
      dispatch(setPassword(password))
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO User(Name, Pass) VALUES (?,?)",
          [name, password], (res, result) => {
            var len = result.rows.length;
            console.log(len);

          }, (error) => { console.log(error) }
        );
      })
      navigation.navigate('About');
    }
  };
  

  return (
    <View style={styles.view}>
      <Image style={styles.logo} source={require('../asset/Logo/logo.png')} />
      <View style={styles.logincontent}>
        <Text style={styles.txt}>Username:</Text>
        <TextInput
          style={styles.txtInput}
          placeholder="e.g Jonh"
          onChangeText={(value) => { dispatch(setName(value)) }} />
        <Text style={styles.txt}>Password:</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.txtInput}
          placeholder="*******"
          onChangeText={(value => { dispatch(setPassword(value)) })}
        />
        <Pressable
          onPress={setData}
          style={({ pressed }) => [
            { backgroundColor: pressed ? 'red' : 'yellow' },
            styles.pressable,
          ]}>
          <Text style={styles.txt}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //   logo styles
  logo: {
    height: '18%',
    width: '50%',
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
    fontSize: 20,
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

export default Login;
