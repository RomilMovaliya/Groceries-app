import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GroceriesList = () => {

    const bgcolorList = [
        '#ffe4d4',
        '#e1fcfc'
    ]
    const Groceries: {
        id: number;
        title: string;
        img: ImageSourcePropType;
    }[] = [
            {
                id: 1,
                title: 'Pulses',
                img: require('../assets/pulses.png')
            },
            {
                id: 2,
                title: 'Rice',
                img: require('../assets/rice.png')
            },
            {
                id: 3,
                title: 'Pulses',
                img: require('../assets/pulses.png')
            },

        ]
    return (
        <View>
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={Groceries}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View>
                        <View style={[styles.innerBox, { backgroundColor: bgcolorList[index % bgcolorList.length] }]}>
                            <Image
                                style={{
                                    width: 100, height: 100
                                }}
                                source={item.img}
                                resizeMode='contain'
                            />
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    </View>
                )}
            />

        </View>
    )
}

export default GroceriesList

const styles = StyleSheet.create({
    innerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
    },
    title: {
        fontWeight: '600',
        paddingHorizontal: 20
    }
})