import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import BackIcon from '../../assets/backIcon.svg';
import ShareIcon from '../../assets/shareIcon.svg';
import FavoriteIcon from '../../assets/tabIcons/favoriteIcon.svg';
import { router } from 'expo-router';
import UpdateItemButton from '../../components/updateItemButton';
import ProductDescription from '../../components/productDescription';
import Button from '../../components/button';
import { useSearchParams } from 'expo-router/build/hooks';
import { fruits } from '../../store/FruitsData';
import Icon from '@react-native-vector-icons/material-design-icons';
import { ProductListData } from '../../store/ProductListData';

const ProductDetail = () => {

    const searchParams = useSearchParams();
    const id = Number(searchParams.get('id'));
    const parentId = Number(searchParams.get('parentid'));
    console.log(id, parentId);

    const filterProduct = (ProductListData.find((item) => item.id == parentId));
    const product = filterProduct.data.find((item) => item.id === id);
    console.log(product);

    const [like, setLike] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.topBox}>
                        <Image
                            style={{ width: '90%', height: '100%', alignSelf: 'center', marginBottom: 10 }}
                            resizeMode="contain"
                            source={typeof product.img === 'string' ? { uri: product.img } : product.img}
                        />
                    </View>

                    <View style={styles.topheading}>
                        <BackIcon height={24} width={24} onPress={() => router.back()} />
                        <ShareIcon height={25} width={25} />
                    </View>

                    <View>
                        <View style={styles.titleRow}>
                            <Text>{product.name}</Text>
                            <TouchableOpacity onPress={() => setLike(!like)}>
                                <Icon
                                    name={like ? 'heart' : 'heart-outline'}
                                    color={like ? 'red' : 'black'}
                                    size={24}
                                />
                            </TouchableOpacity>

                        </View>

                        <Text style={styles.subtitleText}>1kg, Price ${product.price}</Text>
                    </View>

                    <UpdateItemButton />

                    <ProductDescription
                        title="Product Detail"
                        description={product.productdetails}
                        weight={false}
                        rating={0}
                    />

                    <ProductDescription
                        title="Nutritions"
                        description={product.nutritions}
                        weight={true}
                        rating={0}
                    />

                    <ProductDescription
                        title="Review"
                        description={product.review}
                        weight={false}
                        rating={Math.round(product.rating)}
                    />
                </ScrollView>


                <View style={styles.bottomButton}>
                    <Button
                        title="Add To Basket"
                        onPress={() => { router.navigate('/screens/HomeScreen') }}
                    />
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
        height: 200,
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
