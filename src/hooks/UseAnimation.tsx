import React, { useRef } from 'react'
import { Animated, Easing } from 'react-native';

export const UseAnimation = (opacityInit:number=0,opactiEnd:number=1 )=> {
    
    const opacity = useRef( new Animated.Value(opacityInit) ).current;

    const position=useRef( new Animated.Value(-200) ).current;


    const startMovingPosition=(initPosition:number,duration:number=300)=>{

        position.setValue(initPosition);
        Animated.timing(
            position,
            {
                toValue:0,
                duration,
                useNativeDriver:true,
              //  easing:Easing.bounce
            }
        ).start() ;

    }


    const fadeIn=()=>{
            Animated.timing(
               opacity, 
               {toValue:opactiEnd,
                duration:1500,
                useNativeDriver:true
                    
                }
        ).start();
      
        
       
    }

    const fadeOut=()=>{

       
    Animated.timing(
        position,
        {
            toValue:-200,
            duration:300,
            useNativeDriver:true,
            easing:Easing.cubic
        }
    ).start() ;
    Animated.timing(
        opacity, 
        {toValue:0,
         duration:1000,
         useNativeDriver:true,
         
         }
 ).start()

  
        }
    
    return {
        position,
        opacity,
        fadeIn,
        fadeOut,
        startMovingPosition
    }
}