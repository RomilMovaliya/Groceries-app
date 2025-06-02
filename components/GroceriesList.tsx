import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { ProductListData } from '../store/ProductListData'

const bgcolorList = ['#ffe4d4', '#e1fcfc']

const GroceriesList = () => {

    const Groceries = ProductListData.map((category) => ({
        id: category.id,
        title: category.title,
        img: category.image,
        productId: category.id
    }))

    return (
        <View>
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={Groceries}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity

                        onPress={() => router.navigate(`/screens/ProductList?id=${item.productId}`)}
                        activeOpacity={0.5}
                        style={[styles.innerBox
                            , { backgroundColor: bgcolorList[index % bgcolorList.length] }
                        ]}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={item.img}
                            resizeMode='contain'
                        />
                        <Text style={styles.title}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default GroceriesList

const styles = StyleSheet.create({
    innerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        width: 300,
        height: 100
    },
    title: {
        fontWeight: '600',
        paddingHorizontal: 20,
        maxWidth: 150
    }
})
