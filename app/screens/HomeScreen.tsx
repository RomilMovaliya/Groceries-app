import { BackHandler, FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import SearchBar from '../../components/searchbar'
import MapIcon from "../../assets/mapIcon.svg"
import Logo from "../../assets/colorlogo.svg"
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductTitle from '../../components/ProductTitle'
import ProductCarousel from '../../components/ProductCarousel'
import Car from '../../components/carousel'
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks'
import { ProductListData } from '../../store/ProductListData'
import GroceriesList from '../../components/GroceriesList'

const HomeScreen = () => {
    const label = ProductListData.find((item) => item.label === "Exclusive Offers");
    console.log('-------------------------------------------------------');

    console.log('label', label);

    const flatData = [
        { type: 'logo' },
        { type: 'location' },
        { type: 'searchbar' },
        { type: 'carouselSection' },

        { type: 'section', title: 'Exclusive Offers' },
        { type: 'carousel', data: ProductListData[1], parentid: ProductListData[1].id },

        { type: 'section', title: 'Best Selling' },
        { type: 'carousel', data: ProductListData[1], parentid: ProductListData[1].id },

        { type: 'section', title: 'Groceries' },
        { type: 'Groceries List', data: ProductListData[1], parentid: ProductListData[1].id },
    ];
    console.log(flatData[5].data)
    const { zone, area } = useLocalSearchParams();

    console.log("parentid", flatData[5].parentid)

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
            case 'carouselSection':
                return <Car />;
            case 'section':
                return <ProductTitle title={item.title} />;
            case 'carousel':
                return (
                    <ProductCarousel
                        id={item.parentid}
                        data={item.data.data}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                );
            case 'Groceries List':
                return (
                    <GroceriesList />
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
