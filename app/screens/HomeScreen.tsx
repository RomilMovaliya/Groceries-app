import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from '../../components/searchbar'
import MapIcon from "../../assets/mapIcon.svg";
import Logo from "../../assets/colorlogo.svg";
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from '../../components/carousel';

const HomeScreen = () => {

    return (
        <SafeAreaView>
            <View style={styles.box}>
                <Logo width={70} height={70} />
                <View style={styles.title}>
                    <MapIcon width={20} height={20} />
                    <Text>Dhaka, Banassre</Text>
                </View>

                <SearchBar />
                <Carousel />
            </View>


        </SafeAreaView>

    )
}

export default HomeScreen

const styles = StyleSheet.create({
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