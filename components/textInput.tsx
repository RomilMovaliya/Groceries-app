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
                mode="flat"
                activeUnderlineColor="#7C7C7C"
                style={[styles.input, customstyle]}
                contentStyle={styles.inputContent} // this controls internal padding
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
        backgroundColor: 'transparent',
        marginVertical: 8,
    },
    inputContent: {
        paddingTop: 30,       // more space for floating label
        paddingBottom: 5,    // give a breathing room
    }
});
