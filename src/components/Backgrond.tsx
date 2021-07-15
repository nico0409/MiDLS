import React from 'react'
import { Animated, Image, useWindowDimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { UseAnimation } from '../hooks/UseAnimation';

interface Props{
    srcImg:string
}
export const Backgrond = ({srcImg}:Props) => {
    const{width,height}=useWindowDimensions();
    const {opacity,fadeIn,fadeOut} =UseAnimation(0.4,0.65);
    fadeIn();

    return (
        <LinearGradient 
                colors={['rgba(143,191,231,1)'  ,'rgba(245,217,47,1)','rgba(143,191,231,1)'    ]}
                style={{ ...StyleSheet.absoluteFillObject }}
                start={{ x: 0.1, y: 0.1 }}
                end={{ x: 0.2, y: 4}}> 
                     <Animated.View
            style={{
                position:'absolute',
                backgroundColor:'white',
                width,
                height,

         

                opacity
            }}

            
        >
         <Image 
         source={require('../assets/collage50pn.png')
         } 
            style={{
                
                width:width,
                height:height,
                
            }}
         /> 
        </Animated.View>
        </LinearGradient>
 
            
        
    )
}
