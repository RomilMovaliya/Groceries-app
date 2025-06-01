import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetFooter, BottomSheetView } from '@gorhom/bottom-sheet';


const FilterBottomSheet: React.FC = ({ }) => {

    const snapPoints = useMemo(() =>
        ['25%', '50%', '70%']
        , []);

    const bottomSheetRef = useRef<BottomSheet>(null);

    const renderBackdrop = useCallback((props: any) => (<BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1} {...props} />), []);

    const renderFooter = useCallback((props) => (
        <BottomSheetFooter  {...props}>
            <View style={{ margin: 5 }}>
                <TouchableOpacity
                    onPress={() => { bottomSheetRef.current.close() }}
                    style={{ backgroundColor: 'orange', margin: 10, borderRadius: 5 }}>
                    <Text style={{ fontSize: 20, textAlign: 'center', padding: 5, color: 'white' }}>Close</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetFooter>

    ), []);

    const setOpen = () => bottomSheetRef.current.expand();
    const setClose = () => {
        bottomSheetRef.current.close();
    }
    return (

        <View style={{ flex: 1 }}>
            <BottomSheet
                snapPoints={snapPoints}
                ref={bottomSheetRef}
                backgroundStyle={{ backgroundColor: '#fff4cf' }}
                handleIndicatorStyle={{ backgroundColor: 'black' }}
                enablePanDownToClose={true}
                backdropComponent={renderBackdrop}
                footerComponent={renderFooter}
                index={-1}
            >
                <BottomSheetView>
                    <View>
                        <Text style={{ color: 'black' }}>Select Your Fruits</Text>
                    </View>

                    {/* <BottomSheetFlatList
                        data={fruits}
                        renderItem={({ item }) => (
                            <View>
                                <Text>{item.name}</Text>
                            </View>
                        )}
                        keyExtractor={item => item.id.toString()}
                        refreshing={true}
                        contentContainerStyle={{ paddingHorizontal: 20, borderColor: 'red', borderWidth: 1 }}
                    /> */}


                </BottomSheetView>

            </BottomSheet>

            <Button
                title='open'
                onPress={setOpen}
            />

            <Button
                title='close'
                onPress={setClose}
            />
        </View>
    )
}

export default FilterBottomSheet

const styles = StyleSheet.create({})