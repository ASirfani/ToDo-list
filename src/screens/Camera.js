import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { RNCamera } from "react-native-camera";
import { useCamera } from "react-native-camera-hooks";
import RNFS from 'react-native-fs'

const Camera = () => {

    const [{ cameraRef }, { takePicture }] = useCamera(null);
    const captureHandle = async()=>{
        try {
            const data = await takePicture();
            
            
            const pathFile = data.uri
            const newFilePath = RNFS.ExternalDirectoryPath + '/MyTest.jpg';
            console.log("----------"+data.uri+"----------");
            console.log("----------"+newFilePath+"----------");
            RNFS.moveFile(pathFile,newFilePath).then(() => {
                console.log('IMAGE MOVED', pathFile, '-- to --', newFilePath);
            }).catch(error => {
                console.log("error"+error);
            })
            

        } catch (error) {
            console.log("error----------------"+error)
        }
    }

    return (
        <View style={{flex:1}}>
            <RNCamera 
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                style={{flex:1, alignItems:'center', justifyContent:'flex-end'}}>
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