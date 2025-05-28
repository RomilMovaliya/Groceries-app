import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function Button({ title, path }) {


    const pressHandler = () => {
        router.replace(`${path}`);

    }
    return (
        <TouchableOpacity style={styles.btn} onPress={pressHandler}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}




const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#53B175',
        borderRadius: 10,
        width: '100%',

    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: 13,
        padding: 16
    }
})