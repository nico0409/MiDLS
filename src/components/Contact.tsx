import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../Themes/DlsTheme';


export const Contact = () => {
    return (
        <View style={{paddingBottom:'5%'}}>
            <View style={{alignItems:'center'}}>
                <Text style={{fontSize:20,fontFamily: 'StagSans-Light',
        
        color: colors.dlsYellowSecondary,paddingBottom:20}}>
                    Siguenos
                </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-evenly',left:7,paddingBottom:10}}>
                <View>
                    <Image
                        source={require('../assets/dls_argentina_logo.png')}
                        style={{
                            width: 25,
                            height: 35,
                            resizeMode: 'stretch',


                        }
                        }
                    />
                  
                </View>
                <View style={{}}>
                    <Icon name={'logo-youtube'} color={colors.dlsYellowSecondary} size={30} />
                    {/* <Text>{descr}</Text> */}
                </View>
                

                <View style={{}}>
                    <Icon name={'logo-linkedin'} color={colors.dlsBluePrimary} size={30} />
                    {/* <Text>{descr}</Text> */}
                </View>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-evenly' }}>
                <View>
                    <Image
                        source={require('../assets/archer-grey.png')}
                        style={{
                            width: 40,
                            height: 40,
                            resizeMode: 'contain'
                        }
                        }
                    />
                </View>
                <View style={{}}>
                    <Icon name={'logo-youtube'} color={colors.dlsWhiteBackGround} size={30} />
                    {/* <Text>{descr}</Text> */}
                </View>
                <View style={{}}>
                    <Icon name={'logo-linkedin'} color={colors.dlsWhiteBackGround} size={30} />
                    {/* <Text>{descr}</Text> */}
                </View>
                
            </View>

        </View>
    )
}





const styles = StyleSheet.create({
    button: {
        width: '80%',
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },

}
)