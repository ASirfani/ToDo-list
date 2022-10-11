import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { setName, setPassword, getCities } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import PushNotification from "react-native-push-notification";

const db = openDatabase({ name: 'as' });

const About = ({ navigation }) => {
  // const [name, setName] = useState('');
  // const [password, setPassword] = useState('');

  const { name, password, cities } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
    dispatch(getCities());


  }, []);


  const getData = () => {
    db.transaction(
      tx => {
        tx.executeSql(
          "SELECT Name, Pass FROM User", [],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              var UserName = results.rows.item(0).Name;
              var UserPass = results.rows.item(0).Pass;
              dispatch(setName(UserName));
              dispatch(setPassword(UserPass));
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

  const update = async () => {
    if (name.length == 0) {
      Alert.alert('Warning!', 'Please type your name .')
    } else {
      try {


        await db.transaction(async tx => {
          tx.executeSql(
            "UPDATE User SET Name=?", [name],
            () => {
              Alert.alert('successfully', 'Update is done');
            }
          )
        })
        // var user = {
        //   Name: name
        // }
        // await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
        // Alert.alert('successfully', 'Update is done');

      } catch (error) {
        console.log('------------------');
        console.log('error:', error);
      }
    }

  }

  const removeItem = () => {

    try {
      // AsyncStorage.removeItem('Name');
      // navigation.navigate('Login')

      db.transaction(tx => {
        tx.executeSql("DELETE FROM User", [], () => {
          navigation.navigate('Login')
        });
      });
    } catch (error) {
      console.log('------------------');
      console.log('error:', error);
    }


  }

  const handlePushNotification = (item) => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'you clicked on ' + item.country,
      message: item.city
    })

  }

  return (
    <View style={styles.view}>
      <Text style={styles.txt}>{name}</Text>
      <Pressable
        onPress={()=>{
          navigation.navigate('Camera');
        }}
        style={({ pressed }) => [
          { backgroundColor: pressed ? 'yellow' : 'green' },
          styles.pressable,
        ]}>
        <Text style={{ fontSize: 20,color:'white' }}>Take Picture</Text>
      </Pressable>
      <FlatList style={{ backgroundColor: '#F2F2F2' }}
        data={cities}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { handlePushNotification(item) }} >
            <View style={{ backgroundColor: 'white', marginTop: 20, width: 300, alignItems: 'center', paddingBottom: 10, borderRadius: 10 }}>
              <Text style={{ fontSize: 30, color: 'black' }}>{item.country}</Text>
              <Text style={styles.txt}>{item.city}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />


    </View>)
  // <View style={styles.view}>
  //   <Text style={styles.txt}>Welcome {name}</Text>

  //   {/* <Text style={styles.txt}>Your password is: {password}</Text> */}

  //   {/* <TextInput style={styles.txtInput} placeholder="Type for Change your name" value={name} onChangeText={value => dispatch(setName(value))} />
  //   <Pressable
  //     onPress={update}
  //     style={({ pressed }) => [
  //       { backgroundColor: pressed ? 'yellow' : 'green' },
  //       styles.pressable,
  //     ]}>
  //     <Text style={{ fontSize: 20 }}>Update</Text>
  //   </Pressable>
  //   <Pressable
  //     onPress={removeItem}
  //     style={({ pressed }) => [
  //       { backgroundColor: pressed ? 'yellow' : 'red' },
  //       styles.pressable,
  //     ]}>
  //     <Text style={{ fontSize: 20 }}>Remove</Text>
  //   </Pressable> */}
  // </View>

}



const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  txt: {
    fontSize: 20,
    marginTop: 30,


  },
  txtInput: {
    backgroundColor: 'white',
    width: '80%',
    height: 70,
    borderRadius: 15,
    fontSize: 20,
    paddingLeft: 20,
    marginTop: 50,
  },
  pressable: {
    width: '34%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,
  },


});

export default About;
