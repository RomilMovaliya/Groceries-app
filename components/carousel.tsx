import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const Carousel = () => {

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/banner.png')}
                width={100}
                height={100}
                resizeMode='cover'
            />
        </View>
    )
}

export default Carousel

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10
    }
})