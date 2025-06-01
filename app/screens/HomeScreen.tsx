import { BackHandler, FlatList, Platform, SectionList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import SearchBar from '../../components/searchbar'
import MapIcon from "../../assets/mapIcon.svg"
import Logo from "../../assets/colorlogo.svg"
import { SafeAreaView } from 'react-native-safe-area-context'

import ProductTitle from '../../components/ProductTitle'
import ProductCarousel from '../../components/ProductCarousel'
import { fruits } from '../../store/FruitsData'
import Car from '../../components/carousel'
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks'
import CarouselScetion from '../../components/carousel'

const HomeScreen = () => {
    const flatData = [
        { type: 'logo' },
        { type: 'location' },
        { type: 'searchbar' },
        { type: 'car' },

        { type: 'section', title: 'Exclusive Offers' },
        { type: 'carousel', data: fruits },

        { type: 'section', title: 'Best Selling' },
        { type: 'carousel', data: fruits },

        { type: 'section', title: 'Groceries' },
        { type: 'carousel', data: fruits },
    ];

    const { zone, area } = useLocalSearchParams();


    useEffect(() => {
        const backAction = () => {
            if (Platform.OS === 'android') {
                BackHandler.exitApp();
                return true; // it prevent default behavior (don't navigate back)
            }
            return false; // it shows iOS default behavior 
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        // below line is for Cleanup the event listener on unmount
        return () => backHandler.remove();
    }, []);


    const renderItem = ({ item }: any) => {
        switch (item.type) {
            case 'logo':
                return (
                    <View style={styles.center}>
                        <Logo width={70} height={70} />
                    </View>
                );
            case 'location':
                return (
                    <View style={styles.title}>
                        <MapIcon width={20} height={20} />
                        <Text>{zone}, {area}</Text>
                    </View>
                );
            case 'searchbar':
                return <SearchBar />;
            case 'car':
                return <Car />;
            case 'section':
                return <ProductTitle title={item.title} />;
            case 'carousel':
                return (
                    <ProductCarousel
                        data={item.data}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>

            <FlatList
                data={flatData}
                renderItem={renderItem}
                keyExtractor={(_, index) => `item-${index}`}
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            />


        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
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
