import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'

import IncrementIcon from '../assets/IncrementIcon.svg';
import DecrementIcon from '../assets/decrementIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, IncremetQuantity } from '../app/Redux/CartSlice';
import { RootState } from '../app/Redux/Store';

interface UpdateItemButtonProps {
    itemData: {
        id: number;
        name: string;
        quantity: number;

    }
    addQuantity?: () => void;
    quantity?: number;
    removeQuantity?: () => void;
}
const UpdateItemButton: React.FC<UpdateItemButtonProps> = ({ itemData, addQuantity, removeQuantity, quantity }) => {

    const dispatch = useDispatch();
    const storedData = useSelector((state: RootState) => state.cart.items);
    console.log(storedData);

    let itemInCart = useMemo(() => storedData.find((item) => item?.name === itemData?.name), [storedData])


    // console.log("stored Data", JSON.stringify(storedData, null, 2));
    // console.log("item Data", itemData);
    console.log('itemincart in updateitem', itemInCart)


    if (!itemData) {

        console.warn("itemData is undefined");

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    disabled={quantity === 1}
                    onPress={() => {
                        removeQuantity()
                    }}
                    style={styles.btnbox}>
                    <DecrementIcon height={20} width={20} />
                </TouchableOpacity>
                <Text style={styles.rectangleBox}>{quantity ?? 1}</Text>
                <TouchableOpacity
                    onPress={() => {
                        addQuantity()
                    }}
                    style={styles.btnbox} >
                    <IncrementIcon height={20} width={20} />
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.btnbox}
                disabled={itemInCart.quantity === 1}
                onPress={() => {
                    console.log("decrement");
                    dispatch(decrementQuantity(itemData))
                }}
            >
                <DecrementIcon height={20} width={20} />
            </TouchableOpacity>
            <Text style={styles.rectangleBox}>{itemInCart.quantity}</Text>
            <TouchableOpacity
                style={styles.btnbox}
                onPress={() => {
                    dispatch(IncremetQuantity(itemData))
                    console.log("increment");
                }}
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