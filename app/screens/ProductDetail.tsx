import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackIcon from "../../assets/backIcon.svg";
import ShareIcon from "../../assets/shareIcon.svg";
const ProductDetail = () => {
    return (
        <SafeAreaView>
            <Image
                style={{
                    alignSelf: 'center',
                    borderWidth: 1
                }}
                source={require('../../assets/appleIcon.png')}
            />

            <View style={{
                position: 'absolute',
                left: 20,
                justifyContent: 'space-between'
            }}>
                <BackIcon style={{

                }} height={25} width={25} />


                <ShareIcon style={{

                }} height={25} width={25} />
            </View>

        </SafeAreaView>
    )
}

export default ProductDetail

const styles = StyleSheet.create({})