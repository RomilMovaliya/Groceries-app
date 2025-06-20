import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { Slot } from 'expo-router'
import { Store } from './Redux/Store'
import Toast from 'react-native-toast-message'
const Rootlayout = () => {
    return (
        <Provider store={Store}>
            <Slot />
            <Toast />
        </Provider>
    )
}

export default Rootlayout

const styles = StyleSheet.create({})