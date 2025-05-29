import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from '../../components/searchbar'
import MapIcon from "../../assets/mapIcon.svg";
import Logo from "../../assets/colorlogo.svg";
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from '../../components/carousel';
import ProductTitle from '../../components/ProductTitle';
import ProductCarousel from '../../components/ProductCarousel';
import { fruits } from '../../store/FruitsData';
import { secondaryColor } from '../../utils/myColors';

const HomeScreen = () => {

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.box}>
                    <Logo width={70} height={70} />
                    <View style={styles.title}>
                        <MapIcon width={20} height={20} />
                        <Text>Dhaka, Banassre</Text>
                    </View>

                    <SearchBar />
                    <Carousel />
                    <ProductTitle title={'Exclusive Offers'} />
                    <ProductCarousel data={fruits} />
                    <ProductTitle title={'Best Selling'} />
                    <ProductCarousel data={fruits} />
                    <ProductTitle title={'Groceries'} />
                    <ProductCarousel data={fruits} />
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: 20,
        backgroundColor: 'white'
    },
    title: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    box: {
        alignItems: 'center'
    }
})