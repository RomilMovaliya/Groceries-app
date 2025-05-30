import { SectionList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from '../../components/searchbar'
import MapIcon from "../../assets/mapIcon.svg"
import Logo from "../../assets/colorlogo.svg"
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel from '../../components/carousel'
import ProductTitle from '../../components/ProductTitle'
import ProductCarousel from '../../components/ProductCarousel'
import { fruits } from '../../store/FruitsData'

const HomeScreen = () => {
    const sections = [
        { title: 'Exclusive Offers', data: fruits },
        { title: 'Best Selling', data: fruits },
        { title: 'Groceries', data: fruits }
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <SectionList
                ListHeaderComponent={() => (
                    <View style={styles.header}>
                        <Logo width={70} height={70} />
                        <View style={styles.title}>
                            <MapIcon width={20} height={20} />
                            <Text>Dhaka, Banassre</Text>
                        </View>
                        <SearchBar />
                        <Carousel />
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
