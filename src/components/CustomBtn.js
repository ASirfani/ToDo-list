import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function CustomBtn({title,width,onPress}) {
    return (
        <TouchableOpacity onPress={onPress}style={[styles.btn,{width:width? width:'40%'}]}>
            <Text style={styles.txt}>{title? title: "Button"}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        borderColor: 'white',
        backgroundColor: '#1BAB00',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 10
    },
    txt: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff'
    }


})