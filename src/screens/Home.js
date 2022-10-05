import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';


const Home = ({navigation}) => {

  return (
    <View style={styles.view}>
      <TextInput
        style={styles.stInput}
        placeholder="Please enter your name"
        textAlign="center"
      />
      <TextInput
        style={styles.stInput}
        placeholder="Please enter your age"
        textAlign="center"
      />
      <Pressable
        style={({pressed}) => [
          {backgroundColor: pressed ? 'red' : 'yellow'},
          styles.pressable,
        ]}>
        <Text style={styles.txt}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    width: '25%',
    height: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  stInput: {
    width: '75%',
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: 'red',
    backgroundColor: 'white',
    fontSize: 20,
    color: 'red',
    marginBottom: 5,
  },
});

export default Home;
