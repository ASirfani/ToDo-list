import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setTaskID, setTasks } from '../redux/action';
import { FlatList } from 'react-native-gesture-handler';
import GlobalStyle from '../utils/GlobalStyle';
import CheckBox from '@react-native-community/checkbox'





const Done = ({ navigation }) => {


  const { tasks } = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();





  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks)).then(() => {
      dispatch(setTasks(filteredTasks));
      Alert.alert('Delete!', 'Successfully delete the Task');
    }
    ).catch(error => { console.log(error) })


  }


  const checkTaks = (id, newValue) => {
    const index = tasks.findIndex(task => task.ID === id);
    if (index > -1) {
      let newTasks = [...tasks];
      newTasks[index].Done = newValue;
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks)).then(() => {
        dispatch(setTasks(newTasks))
      }).catch(error => { console.log(error) })

    }
  }

  return (
    <View style={styles.body}>
      <FlatList data={tasks.filter(task => task.Done === true)}
        style={styles.flatlist}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={
            () => {
              dispatch(setTaskID(item.ID));
              navigation.navigate('Task')
            }
          }>
            <View style={styles.rowItem}>
              <View style={[{
                backgroundColor:
                  item.Color === 'red' ? '#f28b82' :
                    item.Color === 'blue' ? '#aecbfa' :
                      item.Color === 'green' ? '#ccff90' : '#fff'
              }
                , styles.taskColor]}></View>
              <CheckBox value={item.Done} onValueChange={(newValue) => { checkTaks(item.ID, newValue) }} />
              <View style={styles.bodyItem}>
                <Text numberOfLines={1} style={[styles.itemtxt, GlobalStyle.CustomFont]}>{item.Title}</Text>
                <Text style={{ fontSize: 17, color: '#C4BFBB' }}>{item.Desc}</Text>
              </View>

              <TouchableOpacity style={styles.delete} onPress={() => { deleteTask(item.ID) }}>
                <Icons name='delete' size={27} color='red' />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}

        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity onPress={() => {
        dispatch(setTaskID(tasks.length + 1));
        navigation.navigate('Task')
      }} style={styles.button} >
        <Icon name='plus' size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({

  body: {

    flex: 1,
    alignItems: 'center',
  },

  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#C4BFBB',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,

  },
  flatlist: {
    width: "100%",
  },

  item: {
    height: 80,
    borderColor: '#C4BFBB',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    textAlign: 'left',
    borderWidth: 2,
    color: '#757575',
    elevation: 5,
    justifyContent: 'space-evenly',
  },

  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bodyItem: {
    flex: 1,
    paddingLeft: 5,
  },

  delete: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',


  },


  itemtxt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#939190'
  },
  taskColor: {
    width: 20,
    height: 78,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  }





});
export default Done;