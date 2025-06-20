import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MyButtonProps } from '../types/types'
import { ActivityIndicator } from 'react-native'


const Button: React.FC<MyButtonProps> = ({ title, textStyle, loader, ...props }) => {
    return (
        <TouchableOpacity
            style={styles.btn} {...props}>
            {loader ? (
                <ActivityIndicator
                    style={styles.loader}
                    size="large" color="white"
                />
            ) : (
                <Text style={[styles.title, textStyle]} {...props}>{title}</Text>
            )}

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
    },
    loader: {
        padding: 10
    }
})