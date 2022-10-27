import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomBtn from '../components/CustomBtn'
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PushNotification from 'react-native-push-notification';
import RNFS from 'react-native-fs';



export default function Task({ navigation }) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [done, setDone] = useState(false);
    const [color, setColor] = useState('White');
    const [showBellModell, setShowBellModell] = useState(false);
    const [minute, setMinute] = useState('1');
    const [image, setImage] = useState('');

    const { tasks, taskID } = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        navigation.addListener('focus', () => { getTask() });

    }, [])


    const getTask = () => {
        const Task = tasks.find(task => task.ID === taskID);

        if (Task) {
            setTitle(Task.Title);
            setDesc(Task.Desc);
            setDone(Task.Done);
            setColor(Task.Color);
            setImage(Task.Image);
        }
    }


    const setTask = () => {
        if (title.length == 0) {
            Alert.alert('Warning!', 'please Fill the blink')
        } else {
            try {
                var Task = {
                    ID: taskID,
                    Title: title,
                    Desc: desc,
                    Done: done,
                    Color: color,
                    Image: image
                }
                const index = tasks.findIndex(task => task.ID === taskID);

                let newTasks = [...tasks, Task];
                if (index > -1) {
                    newTasks = [...tasks]
                    newTasks[index] = Task;
                } else {
                    newTasks = [...tasks, Task]
                }
                AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
                    .then(() => {
                        dispatch(setTasks(newTasks));
                        Alert.alert('Success!', 'Task saved successfully');
                        navigation.goBack();
                    }).catch(error => console.log(error))
            } catch (error) {
                console.log(error + "------------")
            }

        }

    }

    const setTaskAlart = () => {

        PushNotification.localNotificationSchedule({
            channelId: 'task-channel',
            title: title,
            message: desc,
            date: new Date(Date.now() + parseInt(minute) * 60 * 1000),
            allowWhileIdle: true
        });

    }

    const deleteImage = () => {

        RNFS.unlink(image).then(() => {
            const index = tasks.findIndex(task => task.ID === taskID);
            if (index > -1) {
                let newTasks = [...tasks];
                newTasks[index].Image = '';
                AsyncStorage.setItem('Tasks', JSON.stringify(newTasks)).then(() => {
                    dispatch(setTasks(newTasks));
                    getTask();
                    Alert.alert('Success!', 'Task image is Deleted.');
                    
                }).catch(error => console.log(error))
            }

        }).catch(error => console.log(error))
    }

    return (
        <ScrollView>
            <View style={styles.body}>
                <Modal
                    visible={showBellModell}
                    onRequestClose={() => { setShowBellModell(false) }}
                    transparent

                >
                    <View style={styles.Centel_model}>
                        <View style={styles.View_model}>
                            <View style={styles.body_model}>
                                <Text style={styles.txt_bell}>Remind me After</Text>
                                <TextInput style={styles.input_bell} value={minute} keyboardType='numeric' onChangeText={value => { setMinute(value) }} />
                                <Text style={styles.txt_bell}>minute(s)</Text>
                            </View>
                            <View style={styles.btn_model}>
                                <TouchableOpacity style={styles.cancle_btn}
                                    onPress={() => { setShowBellModell(false) }}
                                ><Text style={[styles.txt_bell, { color: '#fff' }]}>Cancle</Text></TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setTaskAlart();
                                        setShowBellModell(false);
                                    }}
                                    style={styles.ok_btn}><Text style={[styles.txt_bell, { color: '#fff' }]}>OK</Text></TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </Modal>
                <TextInput value={title} style={styles.input} placeholder='Title' onChangeText={(value) => setTitle(value)} />
                <TextInput value={desc} style={[styles.input, { fontWeight: '400' }]} placeholder='Description' multiline onChangeText={(value) => setDesc(value)} />
                <View style={styles.row_color}>
                    <TouchableOpacity style={styles.whiteColor} onPress={() => { setColor('white') }}>{color === 'white' && <Icon name="check" size={20} />}</TouchableOpacity>
                    <TouchableOpacity style={styles.redColor} onPress={() => { setColor('red') }}>{color === 'red' && <Icon name="check" size={20} />}</TouchableOpacity>
                    <TouchableOpacity style={styles.blueColor} onPress={() => { setColor('blue') }}>{color === 'blue' && <Icon name="check" size={20} />}</TouchableOpacity>
                    <TouchableOpacity style={styles.greenColor} onPress={() => { setColor('green') }}>{color === 'green' && <Icon name="check" size={20} />}</TouchableOpacity>
                </View>
                <View style={styles.extra_row}>
                    <TouchableOpacity style={styles.extraBtn}
                        onPress={() => { setShowBellModell(true) }}>
                        <Icon name='bell' size={25} color='#fff' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.extraBtn}
                        onPress={() => { navigation.navigate('Camera', { id: taskID }) }}>
                        <Icon name='camera' size={25} color='#fff' />
                    </TouchableOpacity>

                </View>
                {image ?
                    <View>
                        <Image style={styles.img} source={{ uri: image }} />
                        <TouchableOpacity style={styles.deleteImage} onPress={() => { deleteImage() }}>
                            <Icon name='trash' size={22} color='red' />
                        </TouchableOpacity>
                    </View> : null}
                <View style={styles.checkBox}>
                    <CheckBox value={done} onValueChange={newValue => setDone(newValue)} />
                    <Text>Is Done</Text>
                </View>
                <CustomBtn title="Save Task" width="100%" onPress={setTask} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        padding: 10,

    },
    input: {
        width: "100%",
        borderColor: '#C4BFBB',
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        textAlign: 'left',
        paddingLeft: 15,
        borderWidth: 2,
        fontSize: 20,
        color: '#757575',
        fontWeight: 'bold'
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    row_color: {
        flexDirection: 'row',
        height: 50,
        width: "100%",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#555555',
    },
    whiteColor: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10


    },
    redColor: {
        flex: 1,
        backgroundColor: '#f28b82',
        alignItems: 'center',
        justifyContent: 'center'

    },
    blueColor: {
        flex: 1,
        backgroundColor: '#aecbfa',
        alignItems: 'center',
        justifyContent: 'center',

    },
    greenColor: {
        flex: 1,
        backgroundColor: '#ccff90',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10

    },
    extra_row: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        marginVertical: 10,
    },

    extraBtn: {
        marginHorizontal: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C4BFBB',
        height: 50,
        borderRadius: 10,
    },

    Centel_model: {
        flex: 1,
        backgroundColor: '#00000099',
        alignItems: 'center',
        justifyContent: 'center',

    },
    View_model: {
        width: 300,
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    body_model: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt_bell: {
        fontSize: 20

    },
    input_bell: {
        height: 50,
        width: 50,
        borderColor: '#C4BFBB',
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 15
    },
    btn_model: {
        flexDirection: 'row',
        height: 50,
    },
    cancle_btn: {
        flex: 1,
        backgroundColor: 'red',
        borderBottomLeftRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'

    },
    ok_btn: {
        flex: 1,
        backgroundColor: 'green',
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'

    },
    img: {
        width: 300,
        height: 300,
        margin: 20,
    },
    deleteImage: {
        width: 50,
        height: 50,
        position: 'absolute',
        backgroundColor: '#E2E2E2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        bottom: 23,
        right: 23

    }











})