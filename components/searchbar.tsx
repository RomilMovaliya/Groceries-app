import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import SearchIcon from "../assets/searchIcon.svg";
const SearchBar = () => {
    return (
        <View style={styles.container}>
            <SearchIcon
                height={20}
                width={20}
            />
            <TextInput
                style={{
                    flex: 1,
                }}
                placeholder='Search Store'
            />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 10,
        flexDirection: 'row',
        backgroundColor: '#F2F3F2',
        borderRadius: 15,
        marginHorizontal: 15,
        padding: 5,
        paddingHorizontal: 15,
    },


})