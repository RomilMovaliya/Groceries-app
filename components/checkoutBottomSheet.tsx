import { StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useCallback, useMemo, useRef } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFooter, BottomSheetFooterProps, BottomSheetProps, BottomSheetView } from '@gorhom/bottom-sheet'
import Button from './button';



const CheckoutBottomSheet = forwardRef<BottomSheet, BottomSheetProps>(({ ...props }, ref) => {

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
                    />
                </View>
            </BottomSheetFooter>
        ),
        []
    );
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
                <View>
                    <Text>Delivery</Text>
                    <Text>Payment</Text>
                    <Text>Promo Code</Text>
                    <Text>Total Cost</Text>
                    <Text>By placing an order you agree to our
                        Terms And Conditions</Text>
                </View>
            </BottomSheetView>
        </BottomSheet>
    )
});

export default CheckoutBottomSheet

const styles = StyleSheet.create({})