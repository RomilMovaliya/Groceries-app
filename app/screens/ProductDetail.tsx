import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import BackIcon from '../../assets/backIcon.svg';
import ShareIcon from '../../assets/shareIcon.svg';
import { router } from 'expo-router';
import UpdateItemButton from '../../components/updateItemButton';
import ProductDescription from '../../components/productDescription';
import Button from '../../components/button';
import { useSearchParams } from 'expo-router/build/hooks';
import Icon from '@react-native-vector-icons/material-design-icons';
import { ProductListData } from '../../store/ProductListData';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/CartSlice';
import { RootState } from '../Redux/Store';
import { addToFavorite } from '../Redux/FavoriteSlice';
import { removeFromFavorite } from '../Redux/FavoriteSlice';
import { fetchItemData } from '../../supabase/data/dataFunction';
import { Database } from '../../database.types';

export type ITEM = Database['public']['Tables']['items_data']['Row'];
const ProductDetail = () => {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get('id'));
    const parentId = Number(searchParams.get('parentid'));

    const [quantity, setQuantity] = useState(1);
    const [filterProduct, setFilterProduct] = useState<ITEM | null>(null);

    useEffect(() => {
        const productListDataFunc = async () => {
            if (!parentId || !id) {
                console.warn("Invalid parentId or id");
                return;
            }
            const productListData = await fetchItemData(parentId);
            const matchedProduct = productListData.data?.find((item) => item.id === id);
            setFilterProduct(matchedProduct ?? null);
            console.log("Matched Product:", matchedProduct);
        };

        productListDataFunc();
    }, [id, parentId]);

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const itemInCart = filterProduct
        ? cartItems.find((item) => item?.id === filterProduct.id)
        : null;

    const [like, setLike] = useState(false);
    const favoriteItems = useSelector((state: RootState) => state.favorite.items);

    useEffect(() => {
        if (filterProduct) {
            const isFavorite = favoriteItems.some((item) => item.id === filterProduct.id);
            setLike(isFavorite);
        }
    }, [favoriteItems, filterProduct]);

    const favoriteItemHandler = () => {
        if (!filterProduct) return;

        const isFavorite = favoriteItems.some((item) => item.id === filterProduct.id);
        if (isFavorite) {
            dispatch(removeFromFavorite(filterProduct.id));
        } else {
            dispatch(addToFavorite({ ...filterProduct }));
        }
    };

    if (!filterProduct) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading product details...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                <View style={styles.topBox}>
                    <Image
                        style={{ width: '90%', height: '100%', alignSelf: 'center', marginBottom: 10 }}
                        resizeMode="contain"
                        source={{ uri: filterProduct.img }}
                    />
                </View>

                <View style={styles.topheading}>
                    <BackIcon height={24} width={24} onPress={() => router.back()} />
                    <ShareIcon height={25} width={25} />
                </View>

                <View style={styles.titleRow}>
                    <Text>{filterProduct.name}</Text>
                    <TouchableOpacity onPress={favoriteItemHandler}>
                        <Icon name={like ? 'heart' : 'heart-outline'} color={like ? 'red' : 'black'} size={24} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.subtitleText}>1kg, Price ${filterProduct.price}</Text>

                <UpdateItemButton
                    itemData={itemInCart}
                    addQuantity={() => setQuantity((prev) => prev + 1)}
                    removeQuantity={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                    quantity={quantity}
                />

                <ProductDescription title="Product Detail" description={filterProduct.productdetails} weight={false} rating={0} />
                <ProductDescription title="Nutritions" description={filterProduct.nutritions} weight={true} rating={0} />
                <ProductDescription title="Review" description={filterProduct.review} weight={false} rating={filterProduct.rating} />
            </ScrollView>

            <View style={styles.bottomButton}>
                <Button
                    title="Add To Basket"
                    onPress={() => {
                        const payload = { ...filterProduct, quantity: itemInCart ? quantity - 1 : quantity };
                        dispatch(addToCart(payload));
                        router.navigate('/tabs/cart');
                    }}
                />
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