import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../../components/button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

const OrderAccepted = () => {
    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                    <Image
                        style={{ height: 200, width: 200 }}
                        source={require('../../assets/confirmImg.png')}
                    />
                    <Text style={{ fontWeight: '500', fontSize: 25, textAlign: 'center', marginTop: 30 }}>
                        Your Order has been accepted
                    </Text>
                    <Text style={{ color: 'grey', paddingHorizontal: 20, textAlign: 'center', marginTop: 25 }}>
                        Your items has been placed and is on its way to being processed
                    </Text>
                </View>

                <View style={{ alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <Button title='Track Order' />
                    <Link href={'/tabs/shop'}>Back To Home</Link>
                </View>
            </View>
        </SafeAreaView>

    )
}

export default OrderAccepted

const styles = StyleSheet.create({})