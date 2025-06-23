import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { router } from 'expo-router'
import { ProductListData } from '../store/ProductListData'
import { fetchCategory } from '../supabase/data/dataFunction'
import { Database } from '../database.types'

const bgcolorList = ['#ffe4d4', '#e1fcfc']
type ITEMS = Database['public']['Tables']['category_table']['Row'];
const GroceriesList = () => {
    const [groceries, setGroceries] = useState<ITEMS[]>([]);

    useMemo(() => {
        const fetchData = async () => {
            const data = await fetchCategory();
            if (data.success) {
                setGroceries(data.data);
                console.log("data", JSON.stringify(data.data, null, 2));
            }
        }
        fetchData();
    }, []);

    return (
        <View>
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={groceries}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity

                        onPress={() => router.navigate(`/screens/ProductList?id=${item.id}`)}
                        activeOpacity={0.5}
                        style={[styles.innerBox
                            , { backgroundColor: bgcolorList[index % bgcolorList.length] }
                        ]}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={{ uri: item.image }}
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
