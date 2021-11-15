import React from 'react';
import { View } from 'react-native';
import { Chase } from 'react-native-animated-spinkit';


export const Loading = () => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'

        }}>
            <Chase size={48} color="#FFF" />
        </View>
    )
}
