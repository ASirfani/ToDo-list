import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { RNCamera } from "react-native-camera";
import { useCamera } from "react-native-camera-hooks";
import RNFS from 'react-native-fs'
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../redux/action";

const Camera = ({navigation, route}) => {

    
    const [{ cameraRef }, { takePicture }] = useCamera(null);
    const { tasks } = useSelector(state => state.taskReducer);
    const dispatch = useDispatch()

    const captureHandle = async () => {
        try {
            const data = await takePicture();
            const pathFile = data.uri;
            updateTask(route.params.id,pathFile);

        } catch (error) {
            console.log("error----------------" + error)
        }
    }


    const updateTask = (id,path) => {
        const index = tasks.findIndex(task => task.ID === id);
        if( index > -1){
            let newTasks = [...tasks];
            newTasks[index].Image = path;
            AsyncStorage.setItem('Tasks',JSON.stringify(newTasks)).then(()=>{
                dispatch(setTasks(newTasks));
                Alert.alert('Success!' , 'Task image is saved.');
                navigation.goBack();
            }).catch(error=>console.log(error))
        }


    }
    return (
        <View style={{ flex: 1 }}>
            <RNCamera
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                <Pressable

                    onPress={captureHandle}
                    style={({ pressed }) => [
                        { backgroundColor: pressed ? 'yellow' : 'green' },
                        styles.pressable,
                    ]}>
                    <Text style={{ fontSize: 20, color: 'white' }}>Take Picture</Text>
                </Pressable>
            </RNCamera>
        </View>);
}

const styles = StyleSheet.create({
    pressable: {
        width: '34%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderRadius: 10,
    },
})

export default Camera;