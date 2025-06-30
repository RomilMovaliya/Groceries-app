import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFooter, BottomSheetFooterProps, BottomSheetProps, BottomSheetView } from '@gorhom/bottom-sheet'
import Button from './button';
import CancelIcon from "../assets/cancelIcon.svg";
import CreditCartIcon from "../assets/creditCardIcon.svg";
import LeftIcon from "../assets/leftColorIcon.svg";
import { router, useFocusEffect } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/Redux/Store';
import { removeFromCart } from '../app/Redux/CartSlice';
import { getUserSession } from '../supabase/auth/authFunction';
import { fetchCartItems, removeItemFromCart } from '../supabase/cart/cart.function';
import { Database } from '../database.types';

interface CheckoutBottomSheetProps {
    totalprice: string;
    children: React.ReactNode;
}
type ITEM = Database["public"]["Tables"]["cart"]["Row"];
const CheckoutBottomSheet = React.forwardRef<BottomSheet, CheckoutBottomSheetProps>((props, ref) => {
    const [cartItems, setCartItems] = useState<ITEM[]>([]);
    const [userId, setUserId] = useState();
    useFocusEffect(
        useCallback(() => {
            const fetchUserAndCart = async () => {
                const userInfo = await getUserSession();
                if (userInfo.success) {
                    const id = userInfo.user.session.user.user_metadata.sub;
                    setUserId(id);

                    const cartResult = await fetchCartItems(id);
                    if (cartResult.success && cartResult.data) {
                        setCartItems(cartResult.data);
                        console.log(
                            "Cart items refreshed:",
                            JSON.stringify(cartResult.data, null, 2)
                        );
                    } else {
                        console.log("Cart fetch failed:", cartResult.message);
                    }
                } else {
                    console.log("User session fetch failed.");
                }
            };

            fetchUserAndCart();
        }, [])
    );



    const removeItemFn = async (userid: string, id: number) => {
        const result = await removeItemFromCart(userid, id);
        if (result.success) {
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        }
    };

    const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
    const [isLoading, setIsLoading] = useState(false);
    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1} {...props} />,
        []
    );

    const renderFooter = useCallback(
        (props: BottomSheetFooterProps) => (
            <BottomSheetFooter {...props}>
                <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
                    <Button
                        title='Place Order'
                        loader={isLoading}
                        onPress={() => {
                            setIsLoading(true);
                            cartItems.forEach((item) => {
                                removeItemFn(userId, item.id);
                            })
                            router.navigate("/screens/OrderAccepted/")

                            setIsLoading(false)
                        }}
                    />
                </View>
            </BottomSheetFooter>
        ),
        []
    );

    const bottomSheetList = [
        {
            id: 1,
            key: "Delivery",
            value: "Select Method"
        },
        {
            id: 2,
            key: "payment",
            value: "Select Method",
            icon: "yes"
        },
        {
            id: 3,
            key: "Promo Code",
            value: "Pick discount"
        },
        {
            id: 4,
            key: "Total Price",
            value: `${props.totalprice}`
        }
    ]
    return (

        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: '#F2F3F2' }}
            handleIndicatorStyle={{ backgroundColor: 'black' }}
            backdropComponent={renderBackdrop}
            footerComponent={renderFooter}
            enablePanDownToClose={true}
        >
            <BottomSheetView>
                <View style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: 15,
                    borderBottomColor: '#E2E2E2',
                    borderBottomWidth: 1.5
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '600',
                    }}>Checkout</Text>

                    <CancelIcon
                        onPress={() => {
                            if (ref && typeof ref !== 'function' && ref?.current) {
                                ref.current.close();
                            }
                        }}
                        height={20}
                        width={20}
                    />

                </View>

                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={bottomSheetList}
                    renderItem={({ item }) => (
                        <View style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1.5,
                            borderColor: '#E2E2E2',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingVertical: 12,
                            marginHorizontal: 10
                        }}>
                            <Text>{item.key}</Text>

                            <View style={{
                                flexDirection: 'row',
                                gap: 15,
                                alignItems: 'center'
                            }}>
                                {item.icon ? (
                                    <CreditCartIcon />
                                ) : (
                                    <Text>{item.value}</Text>
                                )}

                                <LeftIcon />
                            </View>
                        </View>
                    )}

                />


                <Text style={{
                    color: 'grey',
                    textAlign: 'left',
                    paddingHorizontal: 10,
                    paddingVertical: 20
                }}>By placing an order you agree to our
                    <Text style={{ color: 'black' }}> Terms</Text> And <Text style={{ color: 'black' }}>Conditions</Text>.</Text>

            </BottomSheetView>
        </BottomSheet >
    )
});

export default CheckoutBottomSheet

const styles = StyleSheet.create({})