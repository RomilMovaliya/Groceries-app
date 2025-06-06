import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useCallback, useMemo, useRef } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFooter, BottomSheetFooterProps, BottomSheetProps, BottomSheetView } from '@gorhom/bottom-sheet'
import Button from './button';
import CancelIcon from "../assets/cancelIcon.svg";
import CreditCartIcon from "../assets/creditCardIcon.svg";
import LeftIcon from "../assets/leftColorIcon.svg";
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/Redux/Store';
import { removeFromCart } from '../app/Redux/CartSlice';

interface CheckoutBottomSheetProps {
    totalprice: string;
    children: React.ReactNode;
}

const CheckoutBottomSheet = React.forwardRef<BottomSheet, CheckoutBottomSheetProps>((props, ref) => {

    const storeData = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
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
                        onPress={() => {
                            storeData.length !== 0 && router.navigate("/screens/OrderAccepted/")

                            storeData.forEach((item) => {
                                dispatch(removeFromCart({ ...item }));
                            })

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