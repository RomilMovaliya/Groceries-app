import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import IncrementIcon from '../assets/IncrementIcon.svg';
import DecrementIcon from '../assets/decrementIcon.svg';

const UpdateItemButton: React.FC = () => {

    const [count, setCount] = useState(1);

    const handleIncrement = () => {
        setCount(count + 1);
    }
    const handleDecrement = () => {
        if (count === 1) {
            return;
        }
        setCount(count - 1);
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.btnbox}
                onPress={handleDecrement}
            >
                <DecrementIcon height={20} width={20} />
            </TouchableOpacity>
            <Text style={styles.rectangleBox}>{count}</Text>
            <TouchableOpacity
                style={styles.btnbox}
                onPress={handleIncrement}
            >
                <IncrementIcon height={20} width={20} />
            </TouchableOpacity>
        </View>
    )
}

export default UpdateItemButton

const styles = StyleSheet.create({
    rectangleBox: {
        borderRadius: 6,
        width: 40,
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderWidth: 0.2
    },

    container: {
        marginTop: 10,
        paddingHorizontal: 20,
        borderColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },

    btnbox: {
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#E2E2E2'
    },
})