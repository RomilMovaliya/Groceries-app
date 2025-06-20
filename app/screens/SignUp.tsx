import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Platform,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import LogoIcon from "../../assets/colorlogo.svg";
import Button from '../../components/button';
import CustomTextInput from '../../components/textInput';
import { Link, router } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import { signUpWithEmail } from '../../supabase/auth/authFunction';
import Toast from 'react-native-toast-message';

const SignUp = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    const signupHandler = async (values: {
        username: string,
        email: string,
        password: string
    }) => {
        setLoading(true);
        const status = await signUpWithEmail(values.username.toLocaleLowerCase(), values.email, values.password);

        if (status.success) {
            console.log("Msg", status.message);
            setLoading(false);
            router.navigate({
                pathname: "/screens/Verification",
                params: { id: 'signup', email: values.email }
            });

        } else {
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: 'Signup Failed',
                text2: status.message,
            });
        }
    }

    const registerValidationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .required('Username is required'),
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
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
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
                            <Text style={styles.title}>Sign Up</Text>
                            <Text style={styles.subtitle}>Enter your email and password</Text>
                        </View>

                        <View style={styles.form}>
                            <Formik
                                initialValues={{ username: '', email: '', password: '' }}
                                validationSchema={registerValidationSchema}
                                onSubmit={async (values) => {
                                    signupHandler(values);
                                }}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <>
                                        <CustomTextInput
                                            label={'Username'}
                                            onChangeText={handleChange('username')}
                                            onBlur={handleBlur('username')}
                                            value={values.username}
                                            errors={errors.username && touched.username ? errors.username : undefined}

                                        />

                                        <CustomTextInput
                                            label={'Email'}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                            errors={errors.email && touched.email ? errors.email : undefined}
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
                                                )}
                                        />

                                        <CustomTextInput
                                            label={'Password'}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            toggleButton={togglePasswordVisibility}
                                            value={values.password}
                                            hidePassword={hidePassword}
                                            secureTextEntry={hidePassword}
                                            errors={errors.password && touched.password ? errors.password : undefined}
                                        />

                                        <Text style={styles.termsText}>
                                            By continuing you agree to our{' '}
                                            <Link href={'/screens/SignUp'} style={styles.link}>
                                                Terms of Service and Privacy Policy.
                                            </Link>
                                        </Text>

                                        <Button
                                            title={'Sign Up'}
                                            onPress={() => handleSubmit()}
                                            disabled={loading}
                                            loader={loading}
                                        />

                                        <Text style={styles.bottomText}>
                                            Already have an account?
                                            <Link href={"/screens/Login"} style={styles.link}> Login</Link>
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

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 20
    },
    logobox: {
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 40,
    },
    titlebox: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    subtitle: {
        color: '#7C7C7C',
        fontSize: 12,
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
    termsText: {
        color: '#181725',
        fontSize: 10,
        marginBottom: 15,
    },
    bottomText: {
        textAlign: 'center',
        color: '#181725',
        fontWeight: '600',
        marginTop: 6,
        fontSize: 10,
        marginBottom: 15,
    },
    link: {
        color: '#53B175',
    },
    loader: {
        position: 'absolute',
        top: 150,
        left: 0,
        right: 0,
    }
});
