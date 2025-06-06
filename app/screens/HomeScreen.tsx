import { BackHandler, FlatList, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import SearchBar from '../../components/searchbar'
import MapIcon from "../../assets/mapIcon.svg"
import Logo from "../../assets/colorlogo.svg"
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductTitle from '../../components/ProductTitle'
import ProductCarousel from '../../components/ProductCarousel'
import CarouselScetion from '../../components/carousel'
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks'
import { ProductListData } from '../../store/ProductListData'
import GroceriesList from '../../components/GroceriesList'

const HomeScreen = () => {

    const { zone, area } = useLocalSearchParams();

    return (

        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <View style={styles.center}>
                    <Logo width={70} height={70} />
                </View>

                <View style={styles.title}>
                    <MapIcon width={20} height={20} />
                    <Text>{zone}, {area}</Text>
                </View>
                <SearchBar />
                <CarouselScetion />
                <ProductTitle title={'Exclusive Offers'} />
                <ProductCarousel
                    data={ProductListData[1].data}
                    id={ProductListData[1].id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />

                <ProductTitle title={'Best Selling'} />
                <ProductCarousel
                    data={ProductListData[1].data}
                    id={ProductListData[1].id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />

                <ProductTitle title={'Groceries'} />
                <GroceriesList />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 20
    },
    container: {
        paddingBottom: 20,
    },
    title: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 10,
    },

    center: {
        alignItems: 'center',
        marginVertical: 10,
    }

})
