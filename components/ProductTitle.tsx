import { StyleSheet, Text, TextProps, View } from 'react-native'
import React from 'react'
import { primaryColor } from '../utils/myColors'
import { MyProductTitle } from '../types/types'
import { Link } from 'expo-router'


const ProductTitle: React.FC<MyProductTitle> = ({ title }) => {
    return (
        <View style={{
            width: '100%',
            paddingHorizontal: 20,
            marginBlock: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: '600'
            }}>{title}</Text>
            <Text style={{
                color: primaryColor,
                fontWeight: '600'
            }}>

                <Link href={'/screens/Explore'}>See all</Link></Text>
        </View>
    )
}

export default ProductTitle

const styles = StyleSheet.create({

})