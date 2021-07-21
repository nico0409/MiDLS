import React, { useContext } from 'react'
import { View } from 'react-native'
import { colors } from '../Themes/DlsTheme';


export const ItemSeparator = () => {
   
    return (
            <View style={{
                    borderBottomWidth:1,
                    opacity:0.4,
                    marginVertical:8,
                    borderColor:colors.dlsBluePrimary
                    
                                }}>
           </View>
    )
}
