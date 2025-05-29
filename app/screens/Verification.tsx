import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import BackIcon from "../../assets/backIcon.svg";
import LeftIcon from "../../assets/leftIcon.svg";
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { primaryColor } from '../../utils/myColors';
import Toast from 'react-native-toast-message';
const Verification = () => {



    const [code, setCode] = useState('');

    const submitHandler = () => {
        router.replace("/tabs");
    }

    const SendCodeHandler = () => {
        Toast.show({
            type: 'success',
            text1: 'code sended to your mail.'
        })
    }

    const BackButtonHandler = () => {
        router.back();
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >

                <BackIcon
                    style={styles.backbtn}
                    height={25}
                    width={25}
                    onPress={BackButtonHandler}
                />

                <View style={styles.title}>
                    <Text style={{
                        fontSize: 25,
                        letterSpacing: -1
                    }}>Enter your 4-digit code</Text>
                    <Text style={{ color: '#7C7C7C', paddingTop: 30 }}>Code</Text>
                    <TextInput
                        keyboardType='number-pad'
                        placeholder='- - - - - -'
                        maxLength={6}
                        onChangeText={setCode}
                        value={code}
                        textAlign='center'
                        style={{
                            fontSize: 18,
                            letterSpacing: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: '#E2E2E2'
                        }}
                    />


                </View>

                <View style={styles.bottomLine}>
                    <Text
                        onPress={SendCodeHandler}
                        style={{
                            color: primaryColor,
                            fontSize: 15,

                        }}>Resend code</Text>

                    <View style={styles.circle}>
                        <LeftIcon
                            height={20}
                            width={20}
                            onPress={submitHandler}
                        />
                    </View>
                </View>

                <Toast />
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default Verification

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    backbtn: {
        position: 'absolute',
        marginHorizontal: 10,
        marginVertical: 2
    },

    title: {
        marginTop: 100,
        paddingHorizontal: 20,
    },
    bottomLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20
    },

    circle: {
        backgroundColor: primaryColor,
        borderRadius: 40,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
})