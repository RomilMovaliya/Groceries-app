import { FlatList, FlatListProps, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import AddIcon from '../assets/plusIcon.svg';
import { primaryColor } from '../utils/myColors';
import { ProductData } from '../types/types';
import { router } from 'expo-router';
import { Database } from '../database.types';
import { fetchCategory, fetchItemData } from '../supabase/data/dataFunction';
import { useSelector } from 'react-redux';
import { RootState } from '../app/Redux/Store';



type ITEMS = Database['public']['Tables']['items_data']['Row'];
interface ProductCarouselProps extends Omit<FlatListProps<ITEMS>, 'data' | 'renderItem'> {
    numColumns?: number,
    categoryId: number;
}

// LOG  cartItems [{"category_id": 6, "created_at": "2025-07-02T11:00:47.682622", "id": 101, "items_data": {"id": 48, "img": "https://www.bbassets.com/media/uploads/p/l/40201858-2_2-baidyanath-nagpur-drakshasava-ayurvedic-tonic-improves-hunger-heart-health.jpg", "name": "Baidyanath Drakshasava Tonic", "nutritions": "Approx. 59 kcal per 100 ml. Promotes digestion.", "pieces": 1, "price": 260, "productdetails": "Larger pack of classic Ayurvedic Drakshasava tonic.", "rating": 5, "review": "Well-loved herbal tonic.", "volume": 650}, "productid": 48, "quantity": 1, "userid": "005a287c-f378-4d4e-ab70-14403ca6296a"}]
const ProductCarousel: React.FC<ProductCarouselProps> = ({ categoryId, numColumns = 1, ...rest }) => {
    const [filterProduct, setFilterProduct] = useState<ITEMS[]>([]);
    const [loading, setLoading] = useState(false);

    const { items: cartItems } = useSelector(
        (state: RootState) => state.cart
    );
    console.log("cartItems", JSON.stringify(cartItems, null, 2));
    console.log("filterProduct", JSON.stringify(filterProduct, null, 2));

    const loadProducts = async () => {

        setLoading(true);
        const fetchData = await fetchItemData(categoryId);
        if (fetchData.success && fetchData.data) {
            setFilterProduct(fetchData.data);
        } else {
            console.log("Error fetching products:", fetchData.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadProducts();
    }, []);
    return (
        <View style={{ height: 220 }}>
            <FlatList
                key={numColumns}
                numColumns={numColumns}
                data={filterProduct}
                refreshing={loading}
                onRefresh={loadProducts}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.box}
                        activeOpacity={0.7}
                        onPress={() => {
                            const data = JSON.stringify(item)
                            router.navigate(`/screens/ProductDetail?id=${item.id}&parentid=${item.category_id}`)
                        }}>
                        <Image
                            source={typeof item.img === 'string' ? { uri: item.img } : item.img}
                            style={{
                                width: '100%',
                                height: 80
                            }}
                            resizeMode='contain'
                        />
                        <Text style={styles.title}>{item.name}</Text>
                        <Text>{item.pieces}, Priceg</Text>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',

                        }}>
                            <Text style={{
                                fontWeight: '600'
                            }}>${item.price}</Text>
                            <View style={styles.rectangle}>

                                <AddIcon height={15} width={15} />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                {...rest}
            />
        </View>
    )
}

export default ProductCarousel

const styles = StyleSheet.create({
    box: {
        borderWidth: 1,
        height: 210,
        borderColor: '#E3E3E3',
        width: 180,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        borderRadius: 15,
    },

    rectangle: {
        borderRadius: 8,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: primaryColor,
    },

    title: {
        fontSize: 12
    }
})