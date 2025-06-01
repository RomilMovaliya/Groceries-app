import { Dimensions, Image, ImageProps, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { primaryColor } from '../utils/myColors';

const images = [
    require('../assets/banner.png'),
    require('../assets/banner.png'),
    require('../assets/banner.png'),
];

const screenWidth = Dimensions.get('window').width;

const CarouselScetion: React.FC<ImageProps> = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View>
            <Carousel
                data={images}
                autoPlay={true}
                autoPlayInterval={2000}
                loop={true}
                width={screenWidth}
                height={200}
                pagingEnabled={true}
                snapEnabled={true}
                onProgressChange={(_, absoluteProgress) => {
                    // absoluteProgress can be decimal, round it to nearest index
                    const index = Math.round(absoluteProgress);
                    setCurrentIndex(index);
                }}
                renderItem={({ item }) => (
                    <View style={{
                        width: screenWidth,
                        height: 200,
                        paddingHorizontal: 10,
                        borderRadius: 10
                    }}>
                        <Image
                            source={item}
                            style={{
                                width: '100%',
                                height: '100%',

                            }}
                            resizeMode="contain"
                        />
                    </View>
                )}
            />

            <View style={styles.pagination}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 20
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: primaryColor,
    },
    inactiveDot: {
        backgroundColor: 'gray',
    },
});

export default CarouselScetion;
