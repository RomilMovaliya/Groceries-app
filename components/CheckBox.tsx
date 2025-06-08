import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { ProductListData } from '../store/ProductListData';
import { router } from 'expo-router';
import { primaryColor } from '../utils/myColors';
import Button from './button';

interface FilterContentProps {
    title: string;
}

const FilterContent: React.FC<FilterContentProps> = ({ title }) => {

    const allTitles = ProductListData.map((item) => item.title);

    const [selectedOption, setSelectedOption] = useState<string | null>(null);


    useEffect(() => {
        setSelectedOption(title);
    }, [title]);

    const handleApplyFilter = () => {

        const selectedCategory = ProductListData.find((item) => item.title === selectedOption);

        const selectedId = selectedCategory?.id;

        if (selectedId !== undefined) {
            router.replace(`/screens/ProductList?id=${selectedId}`);
        } else {
            console.warn('Selected category not found');
        }
    };

    return (
        <BottomSheetView>
            <Text style={styles.header}>Categories</Text>

            <View style={{ paddingHorizontal: 20 }}>
                {allTitles.map((item) => (
                    <View key={item} style={styles.checkBoxItem}>
                        <Checkbox
                            status={selectedOption === item ? 'checked' : 'unchecked'}
                            onPress={() => setSelectedOption(item)}
                        />
                        <Text style={styles.label}>{item}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    color={primaryColor}
                    title="Apply Filter"
                    onPress={handleApplyFilter} />
            </View>
        </BottomSheetView>
    );
};

export default FilterContent;

const styles = StyleSheet.create({
    header: {
        color: 'black',
        padding: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkBoxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
    },
    buttonContainer: {
        marginHorizontal: 20,
        marginTop: 50,
    },
});
