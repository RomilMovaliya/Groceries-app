import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFooter, BottomSheetFooterProps, BottomSheetView } from '@gorhom/bottom-sheet'
import CheckBoxSection from './CheckBox';
import CloseBtn from "../assets/cancelIcon.svg";

interface FilterBottomSheetProps {
    title: string;
    parentid: string;
}

const FilterBottomSheet = React.forwardRef<BottomSheet, FilterBottomSheetProps>((props, ref) => {

    const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1} {...props} />,
        []
    );
    const [resetFlag, setResetFlag] = useState(false);
    const handleSheetChange = (index: number) => {
        if (index === -1) {
            setResetFlag(prev => !prev);
        }
    };

    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            backgroundStyle={{ backgroundColor: '#F2F3F2' }}
            handleIndicatorStyle={{ backgroundColor: 'black' }}
            enablePanDownToClose
            backdropComponent={renderBackdrop}
        >
            <BottomSheetView>
                <View style={styles.sheetHeader}>
                    <CloseBtn
                        height={20}
                        width={20}
                        onPress={() => {
                            if (ref && typeof ref !== 'function' && ref?.current) {
                                ref.current.close();
                            }
                        }} />
                </View>
                <CheckBoxSection
                    key={`${props.title}-${resetFlag}`}
                    title={props.title}
                />
            </BottomSheetView>
        </BottomSheet>
    )
});

export default FilterBottomSheet

const styles = StyleSheet.create({
    sheetHeader: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'flex-end',
        borderColor: '#ccc',
    },
})