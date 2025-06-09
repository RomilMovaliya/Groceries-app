import { useState } from 'react';
import { Button, Image, View, StyleSheet, FlatList, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const numColumns = 3;

export default function ImagePickerExample() {
    const [img, setImg] = useState([]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'livePhotos', 'videos'],
            allowsMultipleSelection: true,
            allowsEditing: true,
            aspect: [15, 15],
            quality: 1,
            exif: true,
            selectionLimit: 10,
        });

        console.log(result);

        if (!result.canceled) {
            setImg(result.assets);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <Button title="Pick images from gallery" onPress={pickImage} />

            <FlatList
                data={img}
                keyExtractor={(_, index) => index.toString()}
                numColumns={numColumns}
                contentContainerStyle={styles.grid}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item.uri }}
                        style={[styles.image]}
                    />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        marginVertical: 10
    },
    grid: {
        paddingVertical: 20,
    },
    image: {
        margin: 5,
        width: responsiveWidth(30),
        height: responsiveHeight(30),
        borderRadius: 8,
    },
});
