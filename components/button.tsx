import { ButtonProps, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { MyButtonProps } from '../types/types'




const Button: React.FC<MyButtonProps> = ({ title, path }) => {


    const pressHandler = () => {
        router.replace(`${path}`);

    }
    return (
        <TouchableOpacity style={styles.btn} onPress={pressHandler}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}


export default Button;

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