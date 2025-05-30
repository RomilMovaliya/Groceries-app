import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSearchParams } from 'expo-router/build/hooks';
import BackBtn from "../../assets/backIcon.svg";
import ManuBtn from "../../assets/filterIcon.svg";
import { router } from 'expo-router';
import { ProductListData } from '../../store/ProductListData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { primaryColor } from '../../utils/myColors';
import AddIcon from "../../assets/plusIcon.svg";

const ProductList = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const productData = ProductListData.find(item => item.id === Number(id));

    return (
        <SafeAreaView style={{

        }}>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 16,
                backgroundColor: '#fff',
                elevation: 0.8,
                marginTop: 5
            }}>
                <BackBtn
                    onPress={() => {
                        router.replace("/tabs/explore");
                    }} width={25} height={25} />
                <Text>Beverages</Text>
                <ManuBtn width={25} height={25} />
            </View>


            <FlatList
                contentContainerStyle={{
                    padding: 10,
                    paddingBottom: 70
                }}
                numColumns={2}
                data={productData?.data}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.container}>

                        <Image
                            resizeMode='cover'
                            style={{
                                alignSelf: 'center'
                            }}
                            source={item.img}
                        />
                        <Text>{item.name}</Text>
                        <Text>{item.volume}ml</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 2,
                            right: 2,
                            left: 2,
                            paddingBottom: 10,
                            paddingHorizontal: 10
                        }}>
                            <Text>${item.price}</Text>
                            <View style={styles.rectangle}>

                                <AddIcon height={20} width={20} />
                            </View>
                        </View>

                    </TouchableOpacity>


                )}
                keyExtractor={(item) => item.id.toString()}
            />


        </SafeAreaView>
    )
}

export default ProductList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        borderWidth: 0.2,
        marginVertical: 5,
        borderRadius: 20,
        marginHorizontal: 5,
        height: 240
    },
    rectangle: {
        borderRadius: 8,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: primaryColor,
    }
})