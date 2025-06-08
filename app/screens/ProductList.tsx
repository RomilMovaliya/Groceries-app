import React, { useRef } from 'react';
import { FlatList, TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BackBtn from '../../assets/backIcon.svg';
import ManuBtn from '../../assets/filterIcon.svg';
import AddIcon from '../../assets/plusIcon.svg';
import { router } from 'expo-router';
import { ProductListData } from '../../store/ProductListData';
import { primaryColor } from '../../utils/myColors';
import { useSearchParams } from 'expo-router/build/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilterBottomSheet from '../../components/filterBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';

const ProductList = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const productData = ProductListData.find(item => item.id === Number(id));
    const bottomSheetRef = useRef<BottomSheet>(null);
    console.log(productData?.title);

    const openBottomSheet = () => bottomSheetRef.current?.expand();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 16,
                        backgroundColor: '#fff',
                        elevation: 0.8,
                        marginTop: 5,
                    }}
                >
                    <BackBtn
                        onPress={() => {
                            router.replace('/tabs/explore');
                        }}
                        width={25}
                        height={25}
                    />
                    <Text>{productData?.title}</Text>
                    <ManuBtn onPress={openBottomSheet} width={25} height={25} />
                </View>

                <FlatList
                    contentContainerStyle={{ padding: 10, paddingBottom: 70 }}
                    numColumns={2}
                    data={productData?.data}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                router.navigate(`/screens/ProductDetail?id=${item.id}&parentid=${id}`);
                            }}
                            activeOpacity={0.5}
                            style={styles.container}
                        >
                            <Image
                                resizeMode="contain"
                                style={{ alignSelf: 'center' }}
                                height={100}
                                width={100}
                                source={item.img}
                            />
                            <Text>{item.name}</Text>
                            <Text>{item.volume}ml</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    bottom: 2,
                                    right: 2,
                                    left: 2,
                                    paddingBottom: 10,
                                    paddingHorizontal: 10,
                                }}
                            >
                                <Text>${item.price}</Text>
                                <View style={styles.rectangle}>
                                    <AddIcon height={20} width={20} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />

                <FilterBottomSheet
                    title={productData?.title}
                    parentid={id}
                    ref={bottomSheetRef}
                />

            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default ProductList;

const styles = StyleSheet.create({



    container: {
        flex: 1,
        padding: 10,
        borderWidth: 0.2,
        marginVertical: 5,
        borderRadius: 20,
        marginHorizontal: 5,
        height: 240,
    },
    rectangle: {
        borderRadius: 8,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: primaryColor,
    },
    checkBoxItem: {
        flexDirection: 'row'
    }
});
