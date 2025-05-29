import { Image, ImageProps, StyleSheet, View } from 'react-native'
import React from 'react'

// interface MyCarouselProps extends ImageProps {

// }

// here right now i have no any props that i pass so that reason i add one ImageProps directly to below components.

const Carousel: React.FC<ImageProps> = () => {

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/banner.png')}
                width={80}
                height={100}
                resizeMode='cover'
            />


        </View>
    )
}

export default Carousel

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        borderRadius: 8,
        marginTop: 20
    }
})