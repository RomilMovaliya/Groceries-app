import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import LeftIcon from '../assets/leftColorIcon.svg';
import DownIcon from '../assets/downIconColor.svg';
import StarIcon from '../assets/starIcon.svg';

interface ProductDescriptionProps {
    title: string;
    description: string;
    weight: boolean;
    rating: number;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
    title,
    description,
    weight,
    rating,
}) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={toggleDropdown} style={styles.box}>
                <View style={styles.dropdownBox}>
                    <Text style={styles.titleText}>{title}</Text>

                    <View style={styles.iconRow}>
                        {weight && (
                            <Text style={styles.weightTag}>100gm</Text>
                        )}

                        {rating > 0 && (
                            <View style={styles.ratingBox}>
                                {[...Array(rating)].map((_, index) => (
                                    <StarIcon key={index} height={18} width={18} />
                                ))}
                            </View>
                        )}

                        {isOpen ? (
                            <LeftIcon height={18} width={18} />
                        ) : (
                            <DownIcon height={18} width={18} />
                        )}
                    </View>
                </View>
            </TouchableOpacity>

            {!isOpen && (
                <View style={styles.dropdownItem}>
                    <Text style={styles.descriptionText}>{description}</Text>
                </View>
            )}
        </View>
    );
};

export default ProductDescription;

const styles = StyleSheet.create({
    wrapper: {
        borderTopWidth: 1,
        marginHorizontal: 20,
        borderColor: '#E2E2E2',
        marginTop: 10,
    },
    box: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    dropdownBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    weightTag: {
        fontSize: 10,
        backgroundColor: '#E2E2E2',
        borderRadius: 5,
        paddingHorizontal: 6,
        paddingVertical: 3,
        marginRight: 8,
    },
    ratingBox: {
        flexDirection: 'row',
        gap: 4,
        marginRight: 8,
    },
    dropdownItem: {
        marginHorizontal: 30,
        borderWidth: 0.1,
        borderColor: '#E2E2E2',
        paddingVertical: 8,
    },
    descriptionText: {
        color: '#7C7C7C',
        fontSize: 13,
    },
});
