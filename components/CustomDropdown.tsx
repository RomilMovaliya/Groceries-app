import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import DownArrow from '../assets/downArrowIcon.svg';
import UpArrow from '../assets/upArrowIcon.svg';
import { CustomDropdownProps, DropdownItem } from '../types/types';


const CustomDropdown: React.FC<CustomDropdownProps> = ({ data, onSelect }) => {
    const [selectedItem, setSelectedItem] = useState<string>('Select');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (item: DropdownItem) => {
        setSelectedItem(item.name);
        onSelect(item);
        setIsOpen(false);
    };

    return (
        <View>
            <TouchableOpacity style={styles.dropdownSelector} onPress={toggleDropdown}>
                <Text>{selectedItem}</Text>
                {isOpen ? <UpArrow height={20} width={20} /> : <DownArrow height={20} width={20} />}
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdownList}>
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect(item)}>
                                <Text style={{ textAlign: 'center' }}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

export default CustomDropdown;

const styles = StyleSheet.create({
    dropdownSelector: {
        width: '100%',
        borderRadius: 6,
        padding: 10,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff',
    },
    dropdownList: {
        width: '100%',
        maxHeight: 200,
        borderRadius: 6,
        borderWidth: 1,
        marginTop: 5,
        backgroundColor: '#fff',
    },
    dropdownItem: {
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
});
