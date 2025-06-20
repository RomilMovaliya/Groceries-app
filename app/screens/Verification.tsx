import { ActivityIndicator, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackIcon from "../../assets/backIcon.svg";
import LeftIcon from "../../assets/leftIcon.svg";
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { primaryColor } from '../../utils/myColors';
import Toast from 'react-native-toast-message';
import { useSearchParams } from 'expo-router/build/hooks';
import { resendOtp, verifyOTP } from '../../supabase/auth/authFunction';
const Verification = () => {

    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [code, setCode] = useState('');
    const [countdown, setCountDown] = useState(60);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (code.length === 6 && !loader) {
            submitHandler();
        }
    }, [code])

    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountDown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    const timeFormat = (second: number) => {
        const min = Math.floor(second / 60);
        const sec = second % 60;
        return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
    }
    const submitHandler = async () => {
        if (loader) return;
        setLoader(true);
        const status = await verifyOTP(email, code);
        if (!status.success) {
            setLoader(false);
            Toast.show({
                position: 'bottom',
                type: 'error',
                text2: `${status.messsage}`
            })
        } else {
            setLoader(false);
            router.navigate("/screens/SelectLocation");
        }
    }

    const SendCodeHandler = async () => {
        if (countdown > 0) {
            Toast.show({
                type: 'success',
                text1: `wait ${countdown} seconds.`
            });
        } else {
            const response = await resendOtp(email);
            if (response.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Code sent!',
                    text2: response.message,
                });
                setCountDown(60);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to send code',
                    text2: response.message,
                });
            }
        }
    }

    const BackButtonHandler = () => {
        router.back();
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'white'} />
            <KeyboardAvoidingView
                style={styles.container}
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
                    }}>Enter your 6-digit code</Text>
                    <Text style={{ color: '#7C7C7C', paddingTop: 30 }}>Code</Text>
                    <View style={styles.otpBox}>
                        <TextInput
                            keyboardType='number-pad'
                            placeholder='- - - - - -'
                            maxLength={6}
                            onChangeText={setCode}
                            value={code}
                            style={styles.textInput}
                        />
                    </View>

                    {loader && (
                        <ActivityIndicator
                            style={styles.loader}
                            size="large" color="green"
                        />
                    )}
                </View>

                <View style={styles.bottomLine}>
                    <View>
                        <Text
                            onPress={SendCodeHandler}
                            style={{
                                color: primaryColor,
                                fontSize: 15,

                            }}>Resend code</Text>

                        <Text>{countdown > 0 && timeFormat(countdown)}</Text>
                    </View>
                    <View style={styles.circle}>
                        <LeftIcon
                            height={20}
                            width={20}
                            disabled={loader}
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
        marginVertical: 20
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

    textInput: {
        width: '100%',
        fontSize: 18,
        letterSpacing: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2'
    },

    circle: {
        backgroundColor: primaryColor,
        borderRadius: 40,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    otpBox: {
        width: '100%',
        alignItems: 'center'
    },
    loader: {
        marginTop: 20
    }
})