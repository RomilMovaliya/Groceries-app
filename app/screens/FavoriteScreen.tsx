import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../../components/button'
import { useSelector } from 'react-redux'
import { RootState } from '../Redux/Store'
import { useDispatch } from 'react-redux'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import LeftIcon from "../../assets/leftColorIcon.svg";
import { addToCart, removeFromCart } from '../Redux/CartSlice'
import { removeFromFavorite } from '../Redux/FavoriteSlice'
const FavoriteScreen = () => {
    const storeData = useSelector((state: RootState) => state.favorite.items);
    const dispatch = useDispatch();
    console.log("storeData", storeData);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 20,
                    paddingVertical: 12,
                    borderBottomColor: 'grey',
                    borderBottomWidth: 0.5
                }}>Favorite</Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'space-between',
                marginVertical: 10
            }}>
                <FlatList
                    keyExtractor={(item, index) => `${item.id}-${index}`}

                    contentContainerStyle={{
                        paddingHorizontal: 20,
                    }}
                    data={storeData}
                    renderItem={({ item }) => (
                        <View style={{
                            height: responsiveHeight(20),
                            flexDirection: 'row',
                            borderBottomWidth: 1.8,
                            borderBottomColor: '#E2E2E2'
                        }}>

                            <View style={{
                                flex: 0.3,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>

                                <Image
                                    style={{
                                        width: responsiveWidth(25)
                                    }}
                                    resizeMode='contain'
                                    source={typeof item.img === 'string' ? { uri: item.img } : item.img}
                                />
                            </View>

                            <View style={{
                                flex: 0.7,
                                paddingHorizontal: 10,
                                justifyContent: 'center'
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <View>
                                        <Text>{item.name}</Text>
                                        <Text>{item.pieces}gm, Price</Text>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 10
                                    }}>
                                        <Text>${item.price}</Text>
                                        <LeftIcon
                                            height={18}
                                            width={18} />
                                    </View>

                                </View>



                            </View>
                        </View>

                    )}
                />

                <View style={{
                    paddingHorizontal: 20,
                    paddingTop: 10
                }}>
                    <Button
                        onPress={() => {
                            storeData.map((item) => {
                                dispatch(addToCart({ ...item }))
                                dispatch(removeFromFavorite(item.name))
                            })
                        }}
                        title='Add All To Cart'
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}

export default FavoriteScreen

const styles = StyleSheet.create({})