import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/searchbar'
import MapIcon from "../../assets/mapIcon.svg"
import Logo from "../../assets/colorlogo.svg"
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductTitle from '../../components/ProductTitle'
import ProductCarousel from '../../components/ProductCarousel'
import CarouselScetion from '../../components/carousel'
import GroceriesList from '../../components/GroceriesList'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = () => {
    const [zone, setZone] = useState(null);
    const [area, setArea] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const zoneName = await AsyncStorage.getItem('selectedZone');
                const areaName = await AsyncStorage.getItem('selectedArea');

                setZone(JSON.parse(zoneName));
                setArea(JSON.parse(areaName));
            } catch (error) {
                console.error('Error reading from AsyncStorage:', error);
            }
        };
        fetchData();
    }, []);


    return (

        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <View style={styles.center}>
                    <Logo width={70} height={70} />
                </View>

                <View style={styles.title}>
                    <MapIcon width={20} height={20} />
                    <Text>{zone?.name}, {area?.name}</Text>
                </View>
                <SearchBar />
                <CarouselScetion />
                <ProductTitle title={'Exclusive Offers'} />
                <ProductCarousel
                    id={6}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />

                <ProductTitle title={'Best Selling'} />
                <ProductCarousel
                    id={2}
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
