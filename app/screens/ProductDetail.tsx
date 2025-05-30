import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React from 'react';
import BackIcon from '../../assets/backIcon.svg';
import ShareIcon from '../../assets/shareIcon.svg';
import FavoriteIcon from '../../assets/tabIcons/favoriteIcon.svg';
import { router } from 'expo-router';
import UpdateItemButton from '../../components/updateItemButton';
import ProductDescription from '../../components/productDescription';
import Button from '../../components/button';

const ProductDetail = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    <View style={styles.topBox}>
                        <Image
                            style={{ width: '100%' }}
                            resizeMode="contain"
                            source={require('../../assets/appleIcon.png')}
                        />
                    </View>

                    <View style={styles.topheading}>
                        <BackIcon height={24} width={24} onPress={() => router.back()} />
                        <ShareIcon height={25} width={25} />
                    </View>

                    <View>
                        <View style={styles.titleRow}>
                            <Text>Natural Red Apple</Text>
                            <FavoriteIcon width={24} height={24} />
                        </View>

                        <Text style={styles.subtitleText}>1kg, Price</Text>
                    </View>

                    <UpdateItemButton />

                    <ProductDescription
                        title="Product Detail"
                        description="Apple is a nutritious fruit rich in fiber and vitamin C. It is sweet, crisp, and perfect for snacking or adding to salads and desserts."
                        weight={false}
                        rating={0}
                    />

                    <ProductDescription
                        title="Nutritions"
                        description="Apple is a nutritious fruit rich in fiber and vitamin C. It is sweet, crisp, and perfect for snacking or adding to salads and desserts."
                        weight={true}
                        rating={0}
                    />

                    <ProductDescription
                        title="Review"
                        description="Apple is a nutritious fruit rich in fiber and vitamin C. It is sweet, crisp, and perfect for snacking or adding to salads and desserts."
                        weight={false}
                        rating={5}
                    />
                </ScrollView>


                <View style={styles.bottomButton}>
                    <Button title="Add To Basket" path="/screens/HomeScreen" />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ProductDetail;

const styles = StyleSheet.create({
    topheading: {
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingVertical: 30,
        justifyContent: 'space-between',
    },
    topBox: {
        alignSelf: 'center',
        width: '100%',
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: '#E2E3E2',
        height: 300,
        marginTop: 80,
        justifyContent: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    subtitleText: {
        color: '#7C7C7C',
        paddingHorizontal: 20,
    },
    bottomButton: {
        padding: 20,
        borderColor: '#E2E2E2',
        backgroundColor: 'white',
    },
});
