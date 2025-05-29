import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ProductListData } from '../store/ProductListData'
import { router } from 'expo-router'

const ProductListBox = () => {

    return (
        <View style={{
            backgroundColor: 'white'
        }}>
            <FlatList
                data={ProductListData}
                renderItem={({ item }) => (
                    <TouchableOpacity

                        onPress={() => {
                            const id = String(item.id);
                            router.push(`/screens/ProductList?is=${encodeURIComponent(id)}`);
                        }}
                        style={styles.box}>
                        <Image
                            source={item.image}
                        />
                        <Text style={{
                            textAlign: 'center'
                        }}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.row}

            />
        </View>
    )
}

export default ProductListBox

const styles = StyleSheet.create({
    box: {
        flex: 1,
        borderWidth: 1,
        width: 150,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#F8A44C',
        borderRadius: 10,
        backgroundColor: '#fff2d9',
        margin: 5,
    },
    row: {
        justifyContent: 'space-around',
        marginHorizontal: 10,
        marginVertical: 2,
        backgroundColor: '#sffebe0'
    }
})


