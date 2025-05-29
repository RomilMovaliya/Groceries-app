import { FlatList, FlatListProps, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fruits } from '../store/FruitsData'
import AddIcon from '../assets/plusIcon.svg';
import { primaryColor } from '../utils/myColors';
import { ProductData } from '../types/types';
import { router } from 'expo-router';

interface ProductCarouselProps {
    data: ProductData[]
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ data }) => {

    return (
        <View style={{ height: 220 }}>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.box}
                        activeOpacity={0.7}
                        onPress={() => { router.push("/screens/ProductDetail") }}>
                        <Image
                            source={{ uri: item.img }}

                            style={{
                                width: '100%',
                                height: 80
                            }}
                            resizeMode='contain'
                        />
                        <Text>{item.name}</Text>
                        <Text>{item.pieces}, Priceg</Text>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',

                        }}>
                            <Text style={{
                                fontWeight: '600'
                            }}>${item.price}</Text>
                            <View style={styles.rectangle}>

                                <AddIcon height={15} width={15} />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

export default ProductCarousel

const styles = StyleSheet.create({
    box: {
        borderWidth: 1,
        height: 190,
        borderColor: '#E3E3E3',
        width: 180,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        borderRadius: 15,
    },

    rectangle: {
        borderRadius: 8,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: primaryColor,
    }
})