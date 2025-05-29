import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductListBox from '../../components/ProductListBox'

const ExplorePage = () => {
    return (
        <SafeAreaView>
            <View>
                <ProductListBox />
            </View>
        </SafeAreaView>
    )
}

export default ExplorePage

const styles = StyleSheet.create({})