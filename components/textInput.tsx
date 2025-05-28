import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

interface MyTextInputProps extends TextInputProps {
    hidePassword?: boolean;
    toggleButton?: () => void;
    customstyle?: StyleProp<ViewStyle>;
}

const MyTextInput: React.FC<MyTextInputProps> = ({
    label,
    onChangeText,
    value,
    hidePassword,
    toggleButton,
    customstyle,
    ...restProps
}) => {
    return (
        <View>
            <TextInput
                label={label}
                onChangeText={onChangeText}
                value={value}
                style={[styles.input, customstyle]}
                mode="outlined"
                activeOutlineColor="black"
                secureTextEntry={hidePassword}
                right={
                    toggleButton && typeof hidePassword === 'boolean' ? (
                        <TextInput.Icon
                            icon={hidePassword ? 'eye-off' : 'eye'}
                            onPress={toggleButton}
                            color="#7C7C7C"
                        />
                    ) : null
                }
                {...restProps}
            />
        </View>
    );
};

export default MyTextInput;

const styles = StyleSheet.create({
    input: {
        marginVertical: 8,
    },
});
