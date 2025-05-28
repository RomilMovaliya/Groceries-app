import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LogoIcon from "../../assets/colorlogo.svg";
import { TextInput } from 'react-native-paper';
import Button from '../../components/button';
import CustomTextInput from '../../components/textInput';
import { Link } from 'expo-router';

const Login = () => {
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
                <Text style={{ fontSize: 15, fontWeight: '600' }}>Login</Text>
                <Text style={{ color: '#7C7C7C', fontSize: 12 }}>Enter your credentials to continue</Text>
            </View>

            <View style={styles.form}>

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
                    textAlign: 'right',
                    color: '#181725',
                    fontSize: 10,
                    marginBottom: 15
                }}>
                    Forgot Password?
                </Text>

                <Button title={'Log In'} path={'/screens/SelectLocation'} />

                <Text style={{
                    textAlign: 'center',
                    color: '#181725',
                    fontWeight: '600',
                    marginTop: 6,
                    fontSize: 10,
                    marginBottom: 15
                }}>
                    Don’t have an account?
                    <Link style={{
                        color: '#53B175'
                    }} href={"/screens/SignUp"}> SignUp</Link>
                </Text>
            </View>

        </View>
    )
}

export default Login

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
    input: {
        marginTop: 5
    },

    form: {
        flex: 1,
        gap: 10,
        paddingHorizontal: 15,
        paddingBlock: 20,
    }
})