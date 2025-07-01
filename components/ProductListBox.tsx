import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProductListData } from '../store/ProductListData'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchCategory } from '../supabase/data/dataFunction'
import { Database } from '../database.types'

export type ITEM = Database["public"]["Tables"]["category_table"]["Row"];

const ProductListBox = () => {

    const [productsCategory, setProductsCategory] = useState<ITEM[]>([]);
    const [loading, setLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            await loadCategories();
        };
        fetchData();
    }, []);


    async function loadCategories(isRefresh = false) {
        if (isRefresh) {
            setIsRefreshing(true);
        } else {
            setLoading(true);
        }
        const status = await fetchCategory()
        if (status.success) {
            setProductsCategory(status.data ?? []);
        } else {
            console.log("error", status.message);
        }
        if (isRefresh) {
            setIsRefreshing(false);
        } else {
            setLoading(false);
        }

    }

    const colorPalette = [
        { borderColor: '#53B175', backgroundColor: '#d0fac8' },
        { borderColor: '#F7A593', backgroundColor: '#ffe5d0' },
        { borderColor: '#D3B0E0', backgroundColor: '#f7d0f7' },
        { borderColor: '#FDE598', backgroundColor: '#fff9db' },
        { borderColor: '#B7DFF5', backgroundColor: '#e5f6ff' },
        { borderColor: '#FFBBCC', backgroundColor: '#ffe5ec' },
        { borderColor: '#AED9E0', backgroundColor: '#e6f9ff' },
        { borderColor: '#A0D8B3', backgroundColor: '#e6fff4' },
        { borderColor: '#FFC78E', backgroundColor: '#fff4e0' },
        { borderColor: '#D8BFD8', backgroundColor: '#f5e6ff' },
        { borderColor: '#9EC1CF', backgroundColor: '#e9f6fa' },
        { borderColor: '#F2C2CF', backgroundColor: '#fff0f5' }
    ];
    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <FlatList
                data={productsCategory}
                contentContainerStyle={{
                    paddingVertical: 20,
                }}
                refreshing={isRefreshing}
                onRefresh={() => loadCategories(true)}
                renderItem={({ item, index }) => {
                    const color = colorPalette[index % colorPalette.length];
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                router.push(`/screens/ProductList?id=${item.id}`);
                            }}

                            style={[styles.box,
                            {
                                borderColor: color.borderColor,
                                backgroundColor: color.backgroundColor
                            }
                            ]}>
                            <Image
                                style={{
                                    height: 100,
                                    width: 100
                                }}
                                resizeMode='contain'
                                source={{ uri: item.image }}
                            />
                            <Text style={{
                                textAlign: 'center'
                            }}>{item.title}</Text>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.row}
            />
            {loading && <ActivityIndicator
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 10,
                    bottom: 10
                }}
                size={'large'}
                color={'green'}
            />}
        </SafeAreaView>
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

