import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
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

const AccountScreen = () => {

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
    ]
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={'white'} />

            <View style={{
                flex: 1,
                justifyContent: 'space-between'
            }}>
                <View style={styles.header}>

                    <Image
                        style={{
                            height: 80,
                            width: 80,
                            borderRadius: 100,
                            borderWidth: 0.1,
                        }}
                        source={require('../../assets/profile.png')}
                        resizeMode='contain'

                    />


                    <View>
                        <Text>Romil Movaliya</Text>

                        <Text style={{
                            color: 'grey'
                        }}>romil123@gmail.com</Text>
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
                        title='Log Out'
                        textStyle={{ color: primaryColor, backgroundColor: '#ebebeb' }}
                    />
                    <LogoutIcon style={{
                        position: 'absolute',
                        left: 20,
                        top: 20
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
        padding: 15,
        justifyContent: 'center',
        borderRadius: 15
    }
})