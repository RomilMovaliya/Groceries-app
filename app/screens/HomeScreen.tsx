import { BackHandler, Platform, SectionList, StyleSheet, Text, View } from 'react-native'
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

const HomeScreen = () => {
    const sections = [
        { title: 'Exclusive Offers', data: fruits },
        { title: 'Best Selling', data: fruits },
        { title: 'Groceries', data: fruits }
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <SectionList
                ListHeaderComponent={() => (
                    <View style={styles.header}>
                        <Logo width={70} height={70} />
                        <View style={styles.title}>
                            <MapIcon width={20} height={20} />
                            <Text>{zone}, {area}</Text>
                        </View>
                        <SearchBar />
                        <Car />
                    </View>
                )}
                sections={sections}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderSectionHeader={({ section }) => (
                    <View>
                        <ProductTitle title={section.title} />
                        <ProductCarousel
                            data={section.data}
                            horizontal
                            showsHorizontalScrollIndicator={false}

                        />
                    </View>
                )}
                renderItem={() => null}
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
    }
})
