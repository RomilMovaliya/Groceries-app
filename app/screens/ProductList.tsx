import React, { useCallback, useMemo, useRef, useState } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFooter, BottomSheetView } from '@gorhom/bottom-sheet';
import BackBtn from '../../assets/backIcon.svg';
import ManuBtn from '../../assets/filterIcon.svg';
import AddIcon from '../../assets/plusIcon.svg';
import { router } from 'expo-router';
import { ProductListData } from '../../store/ProductListData';
import { primaryColor } from '../../utils/myColors';
import { useSearchParams } from 'expo-router/build/hooks';
import CheckBoxSection from '../../components/CheckBox';
import CloseBtn from "../../assets/cancelIcon.svg";

const ProductList = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const productData = ProductListData.find(item => item.id === Number(id));

    const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
    const bottomSheetRef = useRef<BottomSheet>(null);
    console.log(productData?.title);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1} {...props} />,
        []
    );

    const renderFooter = useCallback(
        (props: any) => (
            <BottomSheetFooter {...props}>
                <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
                    {/* <Button
                        title='Apply Filter'
                    /> */}
                </View>
            </BottomSheetFooter>
        ),
        []
    );

    const openBottomSheet = () => bottomSheetRef.current?.expand();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
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


                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    backgroundStyle={{ backgroundColor: '#F2F3F2' }}
                    handleIndicatorStyle={{ backgroundColor: 'black' }}
                    enablePanDownToClose
                    backdropComponent={renderBackdrop}
                    footerComponent={renderFooter}
                >
                    <BottomSheetView>


                        <View style={styles.sheetHeader}>
                            <CloseBtn height={20} width={20} onPress={() => bottomSheetRef.current?.close()} />
                        </View>
                        <CheckBoxSection
                            title={productData?.title}
                            parentid={id}
                        />

                    </BottomSheetView>
                </BottomSheet>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default ProductList;

const styles = StyleSheet.create({
    sheetHeader: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'flex-end',
        borderColor: '#ccc',
    },


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
