import { FlatList, Image, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import OrderIcon from "../../assets/ProfileIcons/OrdersIcon.svg";
import MyDetailIcon from "../../assets/ProfileIcons/MyDetailsIcon.svg";
import DeliveryAddressIcon from "../../assets/ProfileIcons/DeliceryAddress.svg";
import PaymentIcon from "../../assets/ProfileIcons/VectorIcon.svg";
import PromocodeIcon from "../../assets/ProfileIcons/PromoCordIcon.svg";
import NotificationIcon from "../../assets/ProfileIcons/BellIcon.svg";
import HelpIcon from "../../assets/ProfileIcons/helpIcon.svg";
import AboutIcon from "../../assets/ProfileIcons/aboutIcon.svg";
import LeftIcon from "../../assets/leftColorIcon.svg";
import Button from '../../components/button';
import LogoutIcon from '../../assets/ProfileIcons/LogoutIcon.svg';
import { primaryColor } from '../../utils/myColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserData, logout } from '../../supabase/auth/authFunction';
import { supabase } from '../../supabase/supabase';

const AccountScreen = () => {

    const [name, setName] = useState("userName");
    const [email, setEmail] = useState("youmail@gmail.com");
    const [uri, setUri] = useState('');
    const [modeVisible, setModeVisible] = useState(false);
    const getUserData1 = async () => {
        const imageUri = await AsyncStorage.getItem('capturedPhoto');
        if (imageUri) {
            setUri(imageUri);
        }
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await getUserData();
            setName(userInfo.data.session.user.user_metadata.display_name);
            setEmail(userInfo.data.session.user.user_metadata.email)
            console.log("userInfo", userInfo.data.session.user.user_metadata.display_name);
        };
        fetchUserInfo();
        getUserData1();
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.dismissTo("/screens/Login");
    }

    const handleModeToggle = () => {
        setModeVisible(!modeVisible);
    }
    const profileOptions = [
        {
            id: 1,
            icon: OrderIcon,
            title: 'Orders'
        },
        {
            id: 2,
            icon: MyDetailIcon,
            title: 'My Details'
        },
        {
            id: 3,
            icon: DeliveryAddressIcon,
            title: 'Delivery Address'
        },
        {
            id: 4,
            icon: PaymentIcon,
            title: 'Payment Methods'
        },
        {
            id: 5,
            icon: PromocodeIcon,
            title: 'Promo Cord'
        },
        {
            id: 6,
            icon: NotificationIcon,
            title: 'Notifications'
        },
        {
            id: 7,
            icon: HelpIcon,
            title: 'Help'
        },
        {
            id: 8,
            icon: AboutIcon,
            title: 'About'
        }
    ];


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={'white'} />

            <View style={{
                flex: 1,
                justifyContent: 'space-between'
            }}>
                <View style={styles.header}>

                    {modeVisible && (
                        <Modal visible={true} transparent={true} animationType="fade">
                            <TouchableOpacity
                                activeOpacity={1}
                                onPressOut={() => setModeVisible(false)}
                                style={styles.modalOverlay}
                            >
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={styles.modalContent}
                                    onPress={() => { }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModeVisible(false);
                                            router.navigate('/screens/ImageFromGallary');
                                        }}
                                    >
                                        <Text style={styles.modalText}>Select from Gallery</Text>
                                    </TouchableOpacity>

                                    <View style={styles.modalDivider} />

                                    <TouchableOpacity
                                        onPress={() => {
                                            setModeVisible(false);
                                            router.navigate('/screens/CameraScreen');
                                        }}
                                    >
                                        <Text style={styles.modalText}>Select from Camera</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Modal>
                    )}




                    <TouchableOpacity onPress={() => {
                        setModeVisible(!modeVisible);
                    }}>
                        <Image
                            style={{
                                height: 80,
                                width: 80,
                                borderRadius: 100,
                                borderWidth: 0.1,
                            }}
                            source={{ uri: uri }}
                            resizeMode="contain"
                        />

                    </TouchableOpacity>
                    <View>
                        <Text>{name}</Text>

                        <Text style={{
                            color: 'grey'
                        }}>{email}</Text>
                    </View>
                </View>

                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={profileOptions}
                    renderItem={({ item }) => (
                        <View style={styles.listitem}>
                            <View style={styles.leftlistitem}>
                                <item.icon />
                                <Text>{item.title}</Text>
                            </View>

                            <View>
                                <LeftIcon width={20} height={20} />
                            </View>
                        </View>
                    )}
                />

                <View style={styles.btn}>
                    <Button
                        style={styles.logout}
                        title='Log Out'
                        onPress={handleLogout}
                        textStyle={{ color: primaryColor, backgroundColor: '#ebebeb' }}
                    />
                    <LogoutIcon style={{
                        position: 'absolute',
                        left: 20,
                        top: 25
                    }} height={20} width={20} />

                </View>
            </View>

        </SafeAreaView>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    header: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        borderBottomWidth: 1.5,
        borderBottomColor: '#E2E2E2'
    },

    listitem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 1.5,
        paddingVertical: 15,
        marginHorizontal: 20
    },

    leftlistitem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    btn: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    logout: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#ebebeb',
        padding: 10,
        justifyContent: 'center',
        borderRadius: 15
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        elevation: 5, // For Android shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    modalText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },

    modalDivider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    }

})