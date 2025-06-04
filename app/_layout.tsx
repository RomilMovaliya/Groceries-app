import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { Slot } from 'expo-router'
import { Store } from './Redux/Store'
const Rootlayout = () => {
    return (
        <Provider store={Store}>
            <Slot />
        </Provider>
    )
}

export default Rootlayout

const styles = StyleSheet.create({})