import React, {useState, useEffect} from 'react'
import {View, SafeAreaView, Text, TouchableOpacity} from 'react-native'

export default ({navigation}) => {
    return (
        <View>
            <Text>Settings go here</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate("EditEntry")
            }}><Text>Next!</Text></TouchableOpacity>
        </View>
    )
}