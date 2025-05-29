import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LogoIcon from "../../assets/colorlogo.svg";
import Button from '../../components/button';
import CustomTextInput from '../../components/textInput';
import { Link } from 'expo-router';

const SignUp = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    }
    return (
        <View>
            <View style={styles.logobox}>
                <LogoIcon
                    width={120}
                    height={60} />
            </View>

            <View style={styles.titlebox}>
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: '600'
                    }}
                >
                    Sign Up
                </Text>

                <Text
                    style={{
                        color: '#7C7C7C',
                        fontSize: 12
                    }}>
                    Enter your email and password
                </Text>
            </View>

            <View style={styles.form}>


                <CustomTextInput
                    label={'Username'}

                    onChangeText={setUserName}
                    hidePassword={hidePassword}
                    toggleButton={null}
                    value={userName}
                />

                <CustomTextInput
                    label={'Email'}

                    onChangeText={setEmail}
                    hidePassword={hidePassword}
                    toggleButton={null}
                    value={email}
                />

                <CustomTextInput
                    label={'Password'}
                    onChangeText={setPassword}
                    style={styles.input}
                    toggleButton={togglePasswordVisibility}
                    value={password}
                    hidePassword={hidePassword}
                    secureTextEntry={hidePassword}
                />

                <Text style={{
                    color: '#181725',
                    fontSize: 10,
                    marginBottom: 15
                }}>
                    By continuing you agree to our

                    <Link
                        href={'/screens/SignUp'}
                        style={{ color: '#53B175' }}>
                        Terms of Service and Privacy Policy.
                    </Link>
                </Text>

                <Button title={'Sign Up'} path={'/screens/Verification'} />

                <Text style={{
                    textAlign: 'center',
                    color: '#181725',
                    fontWeight: '600',
                    marginTop: 6,
                    fontSize: 10,
                    marginBottom: 15
                }}>
                    Already have an account?
                    <Link style={{
                        color: '#53B175'
                    }} href={"/screens/Login"}> Login</Link>
                </Text>
            </View>

        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    logobox: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    titlebox: {
        paddingHorizontal: 15,
    },

    form: {
        flex: 1,
        gap: 10,
        paddingHorizontal: 15,
        paddingBlock: 20,
    },
    input: {
        marginTop: 5
    },
})