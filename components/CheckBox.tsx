import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { ProductListData } from '../store/ProductListData';
import { router } from 'expo-router';
import { primaryColor } from '../utils/myColors';
import Button from './button';
import { fetchCategory } from '../supabase/data/dataFunction';
import { Database } from '../database.types';

export type ITEM = Database["public"]["Tables"]["category_table"]["Row"];
interface FilterContentProps {
    title: string;
}

const FilterContent: React.FC<FilterContentProps> = ({ title }) => {
    const [allTitles, setAllTitles] = useState<ITEM[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    console.log("selectedOption", selectedOption);

    useEffect(() => {
        const categories = async () => {
            const cate_data = await fetchCategory();
            setAllTitles(cate_data.data);
        }
        categories()
    }, []);

    useEffect(() => {
        setSelectedOption(title);
        console.log("setSelectedOption", selectedOption);

    }, [title]);

    const handleApplyFilter = () => {

        const selectedCategory = allTitles.find((item) => item.title === selectedOption);
        //console.log("selectedCategory", selectedCategory);

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
                    <View key={item.id} style={styles.checkBoxItem}>
                        <Checkbox
                            status={selectedOption === item.title ? 'checked' : 'unchecked'}
                            onPress={() => setSelectedOption(item.title)}
                        />
                        <Text style={styles.label}>{item.title}</Text>
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
        marginTop: 40,
    },
});
