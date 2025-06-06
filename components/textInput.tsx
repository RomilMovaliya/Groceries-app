import { FormikFormProps, FormikProps } from 'formik';
import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, Text } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

interface MyTextInputProps extends TextInputProps {
    name: string;
    hidePassword?: boolean;
    toggleButton?: () => void;
    customstyle?: StyleProp<ViewStyle>;
    errors?: { [key: string]: string };
    touched?: { [key: string]: boolean };
}

const MyTextInput: React.FC<MyTextInputProps> = ({
    label,
    onChangeText,
    value,
    hidePassword,
    toggleButton,
    customstyle,
    errors,
    touched,
    name,
    ...restProps
}) => {
    return (
        <View>
            <TextInput
                label={label}
                onChangeText={onChangeText}
                value={value}
                mode="flat"
                activeUnderlineColor="#7C7C7C"
                style={[styles.input, customstyle]}
                contentStyle={styles.inputContent}
                secureTextEntry={hidePassword}
                right={
                    toggleButton && typeof hidePassword === 'boolean' ? (
                        <TextInput.Icon
                            icon={hidePassword ? 'eye-off' : 'eye'}
                            onPress={toggleButton}
                            color="#7C7C7C"
                            style={{
                                marginTop: 35
                            }}
                        />
                    ) : null
                }
                {...restProps}
            />

            {!!name && !!errors?.[name] && !!touched?.[name] && (
                <Text style={styles.errorText}>
                    {errors[name]}
                </Text>
            )}

        </View>
    );
};

export default MyTextInput;

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 0,
        backgroundColor: 'transparent',
        marginVertical: 8,
    },
    inputContent: {
        paddingTop: 30,
        paddingBottom: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: -8,
        marginBottom: 10,
    },
});
