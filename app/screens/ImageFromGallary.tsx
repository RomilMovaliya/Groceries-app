import { useState } from 'react';
import { Button, Image, View, StyleSheet, FlatList, Dimensions, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const numColumns = 3;

const ImagePickerExample = () => {
    const [img, setImg] = useState<string | undefined>();
    const [imgUploaded, setImgUploaded] = useState<boolean>(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'livePhotos', 'videos'],
            //allowsMultipleSelection: true,
            allowsEditing: true,
            aspect: [15, 15],
            quality: 1,
            exif: true,
            //selectionLimit: 10,
        });

        console.log(result.assets[0].uri);

        if (!result.canceled) {
            setImg(result.assets[0].uri);
            await AsyncStorage.setItem('capturedPhoto', result.assets[0].uri);
            setImgUploaded(true);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Button title="Pick images from gallery" onPress={pickImage} />

            <Image
                source={{ uri: img }}
                style={[styles.image]}
            />

            {imgUploaded && img ? (
                <Button
                    title="Set Image to Account Screen"
                    onPress={() => router.replace("/screens/AccountScreen")}
                />
            ) : (
                <Text style={{ alignSelf: 'center' }}>No image selected</Text>
            )}
        </SafeAreaView>
    );
}
export default ImagePickerExample;
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
        alignSelf: 'center',
        width: responsiveWidth(30),
        height: responsiveHeight(30),
        borderRadius: 8,
    },
});
