import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import ShopIcon from "../../assets/tabIcons/shopIcon.svg";
import ExploreIcon from "../../assets/tabIcons/exploreIcon.svg";
import CartIcon from "../../assets/tabIcons/cartIcon.svg";
import FavoriteIcon from "../../assets/tabIcons/favoriteIcon.svg";
import AccountIcon from "../../assets/tabIcons/accountIcon.svg";

import ShopIconColor from "../../assets/tabIcons/shopColor.svg";
import ExploreIconColor from "../../assets/tabIcons/exploreColor.svg";
import CartIconColor from "../../assets/tabIcons/cartColor.svg";
import FavoriteIconColor from "../../assets/tabIcons/favoriteColor.svg";
import AccountIconColor from "../../assets/tabIcons/accountColor.svg";
import { primaryColor } from '../../utils/myColors';
import { useSearchParams } from 'expo-router/build/hooks';

const RootLayout = () => {

    const searchParams = useSearchParams();
    const zone = searchParams.get('zone') || 'zone';
    const area = searchParams.get('area') || 'area';

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: primaryColor,
                tabBarInactiveTintColor: 'black',
                tabBarStyle: {
                    paddingTop: 15,
                    paddingBottom: 10,
                    height: 80,
                }
            }}
        >
            <Tabs.Screen
                name='shop'
                options={{
                    tabBarLabel: 'Shop',
                    tabBarLabelStyle: {
                        fontWeight: '500',
                    },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <ShopIconColor width={27} height={27} />
                        ) : (
                            <ShopIcon width={27} height={27} />
                        )
                }}
                initialParams={{ zone, area }}
            />

            <Tabs.Screen
                name='explore'
                options={{
                    tabBarLabel: 'Explore',
                    tabBarLabelStyle: {
                        fontWeight: '500',
                    },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <ExploreIconColor width={27} height={27} />
                        ) : (
                            <ExploreIcon width={27} height={27} />
                        )
                }}
            />

            <Tabs.Screen
                name='cart'
                options={{
                    tabBarLabel: 'Cart',
                    tabBarLabelStyle: {
                        fontWeight: '500',
                    },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <CartIconColor width={27} height={27} />
                        ) : (
                            <CartIcon width={27} height={27} />
                        )
                }}
            />

            <Tabs.Screen
                name='favorite'
                options={{
                    tabBarLabel: 'Favorite',
                    tabBarLabelStyle: {
                        fontWeight: '500',
                    },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FavoriteIconColor width={27} height={27} />
                        ) : (
                            <FavoriteIcon width={27} height={27} />
                        )
                }}
            />

            <Tabs.Screen
                name='account'
                options={{
                    tabBarLabel: 'Account',
                    tabBarLabelStyle: {
                        fontWeight: '600',
                    },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <AccountIconColor width={27} height={27} />
                        ) : (
                            <AccountIcon width={27} height={27} />
                        )
                }}
            />
        </Tabs>
    )
}

export default RootLayout

const styles = StyleSheet.create({})