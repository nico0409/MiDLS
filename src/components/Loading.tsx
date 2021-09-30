import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native';


export const Loading = () => {
    return (
        <View style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center'

        }}>
        <ActivityIndicator
       size={50}
       color='green'
       />
       <Text>Loading...</Text>
        </View>
    )
}
