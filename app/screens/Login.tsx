import {
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import LogoIcon from '../../assets/colorlogo.svg';
import Button from '../../components/button';
import CustomTextInput from '../../components/textInput';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmail } from '../../supabase/auth/authFunction';
import { supabase } from '../../supabase/supabase';

const Login = () => {
    const [hidePassword, setHidePassword] = useState(true);

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };
    const handleUserLogin = async (values: { email: string, password: string }) => {
        await signInWithEmail(values.email, values.password);
        const { data: { user } } = await supabase.auth.getUser();
        console.log("user", user);
        if (user) {
            router.navigate("/screens/Verification");
        }

        /*const user = await AsyncStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            if (userData.email === values.email && userData.password === values.password) {
                console.log("Login successful");
                await AsyncStorage.setItem('isLoggedIn', 'true');
                router.navigate("/screens/Verification");
            } else {
                console.log("Your credentials are Invalid");
            }
        } else {
            console.log("No user data found");
        }*/

    };

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Please enter a valid email')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Must contain at least one lowercase letter')
            .matches(/\d/, 'Must contain at least one number')
            .matches(/[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Must contain at least one special character')
            .required('Password is required'),
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={'white'} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.container}>
                        <View style={styles.logobox}>
                            <LogoIcon width={120} height={60} />
                        </View>

                        <View style={styles.titlebox}>
                            <Text style={styles.title}>Login</Text>
                            <Text style={styles.subtitle}>
                                Enter your credentials to continue
                            </Text>
                        </View>

                        <View style={styles.form}>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={loginValidationSchema}
                                onSubmit={(values) => {
                                    handleUserLogin(values);
                                }}
                            >
                                {({
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    values,
                                    errors,
                                    touched,
                                }) => (
                                    <>

                                        <CustomTextInput
                                            label="Email"
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                            right={
                                                touched.email && !errors.email && (
                                                    <TextInput.Icon
                                                        icon={'check'}
                                                        color={'green'}
                                                        size={25}
                                                        style={{
                                                            marginTop: 35
                                                        }}
                                                    />
                                                )
                                            }
                                            errors={errors.email && touched.email ? errors.email : undefined}
                                        />

                                        <CustomTextInput
                                            label="Password"
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            toggleButton={togglePasswordVisibility}
                                            value={values.password}
                                            hidePassword={hidePassword}
                                            secureTextEntry={hidePassword}
                                            errors={errors.password && touched.password ? errors.password : undefined}
                                        />

                                        <Text style={styles.forgotText}>
                                            Forgot Password?
                                        </Text>

                                        <Button title="Log In" onPress={() => handleSubmit()} />

                                        <Text style={styles.signupText}>
                                            Don't have an account?
                                            <Link href="/screens/SignUp" style={styles.linkText}>
                                                {' '}
                                                Sign Up
                                            </Link>
                                        </Text>
                                    </>
                                )}
                            </Formik>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    logobox: {
        width: '100%',
        paddingVertical: 50,
        alignItems: 'center',
    },
    titlebox: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 12,
        color: '#7C7C7C',
    },
    form: {
        flex: 1,
        gap: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: -8,
        marginBottom: 10,
    },
    forgotText: {
        textAlign: 'right',
        color: '#181725',
        fontSize: 10,
        marginBottom: 15,
    },
    signupText: {
        textAlign: 'center',
        color: '#181725',
        fontWeight: '600',
        marginTop: 6,
        fontSize: 10,
        marginBottom: 15,
    },
    linkText: {
        color: '#53B175',
    },
});
