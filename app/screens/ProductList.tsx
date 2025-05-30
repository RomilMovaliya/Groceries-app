import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSearchParams } from 'expo-router/build/hooks';
import BackBtn from "../../assets/backIcon.svg";
// import ManuBtn from "../../assets/filterIcon.svg";
import { router } from 'expo-router';
import { ProductListData } from '../../store/ProductListData';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductList = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const productData = ProductListData.find(item => item.id === Number(id));
    console.log("Product Data:", productData);

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
                <BackBtn onPress={() => {
                    router.replace("/tabs/explore");
                }} width={25} height={25} />
                <Text>Beverages {id}</Text>
                {/* <ManuBtn width={25} height={25} /> */}
            </View>


            <FlatList
                contentContainerStyle={{
                    padding: 10,
                    paddingBottom: 70
                }}
                numColumns={2}
                data={productData?.data}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Text>{item.name}</Text>
                        <Text>${item.price}</Text>
                        <Image
                            source={item.img}
                        />
                    </View>


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
        borderWidth: 1,
    }
})