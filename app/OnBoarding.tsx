import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LogoIcon from "../assets/logoicon.svg";
import Button from '../components/button';
import { router } from 'expo-router';

const onboarding = () => {
    return (
        <>
            <StatusBar
                barStyle='light-content'
                backgroundColor='transparent'
                translucent={true}
            />
            <ImageBackground
                source={require('../assets/onbording.png')}
                style={styles.background}
                resizeMode='cover'
            >
                <View style={styles.overlay} />
                <View style={styles.container}>
                    <LogoIcon style={{ alignSelf: 'center' }} width={120} height={50} />
                    <Text style={styles.title}>Welcome to our store</Text>
                    <Text style={styles.description}>Get your groceries in as fast as one hour</Text>
                    <View style={{ width: '100%' }}>
                        <Button
                            title={'Get Started'}
                            onPress={() => { router.replace('/screens/Login'); }} />
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}

export default onboarding

const styles = StyleSheet.create({

    title: {
        marginTop: 10,
        color: 'white',
        fontSize: 30,
        paddingHorizontal: 50,
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: 'sans-serif'
    },
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginBottom: 70,
        marginHorizontal: 15,
        justifyContent: 'flex-end',
    },
    description: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        paddingBottom: 20,
        marginHorizontal: 10
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 0
    }
})


