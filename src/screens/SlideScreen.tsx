import React,{useContext, useState}  from 'react'
import { Dimensions, Image, Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { items } from '../data/SlideData';
import { Slide, MenuItem } from '../interfaces/appInterfaces';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { color } from 'react-native-reanimated';
import { UseAnimation } from '../hooks/UseAnimation';
import { useNavigation } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
//import { ThemeContext } from '../Context/themeContext/ThemeContext';







interface Props extends StackScreenProps<any, any> { };

export const SlidesScreen = ({navigation}:Props) => {
    const {opacity,fadeIn,fadeOut} =UseAnimation(0)
    const [activIndex, setActivIndex] = useState (0 )
    const {height: screenHeight ,width : screenWidth}=Dimensions.get('window')
   
    const [isVisible, setIsvisible] = useState(false)
   // const {theme:{colors}} = useContext(ThemeContext)  
    
    
   


    const renderItem=(item:Slide)=>{
       
         
        return  ( 
            <View style={{
                flex:1,
                backgroundColor:'white',
                borderRadius:5,
                padding:40,
                justifyContent:'center'
            }}>
                <Image
                    source={item.img}
                    style={{
                        width:350,
                        height:400,
                        resizeMode:'center'
                    }}                    
                    />
                <Text style={{
                    ...styles.title,
                    color:'black'
                    }}>{item.title}</Text>
                <Text style={{
                    ...styles.subtitle,
                    color:'black'
                    }}>{item.desc}</Text>
            </View>

        )
    }
    return (
     <SafeAreaView  
        style={{
            flex:1,
            backgroundColor:'white',
            paddingTop:50
        }}>
         <Carousel
          //ref={(c) => { this._carousel = c; }}
          data={items}
          renderItem={({item}:{item:Slide})=>renderItem(item)}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          layout="default"
          onSnapToItem={(index)=>{
            setActivIndex(index)
           index===items.length-1&&fadeIn()
           setIsvisible(true)
           
           
           
          }}
        />
        <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            marginHorizontal:20,
            alignItems:'center'}}>
            
            <Pagination
                dotsLength={items.length}
                activeDotIndex={activIndex}
                dotStyle={{
                    width:10,
                    height:5,
                    borderRadius:10,
                    backgroundColor:'rgba(179,9,0,1)'
                    
                    
                }}
                
            />
            {
                isVisible&& <Animated.View style={{
                    opacity
                }}>
                   <TouchableOpacity style={{
                        flexDirection:'row',
                        backgroundColor:'rgba(179,9,0,1)',
                        width:120,
                        height:35,
                        borderRadius:20,
                        justifyContent:'center',
                        alignItems:'center'
                        
                        
                        
                    }}
                    activeOpacity={0.9}
                    onPress={()=>{navigation.replace("EmplidObserveScreen")}}
                    >
                        <Text style={{fontSize:20,color:'white'}}>Entrar</Text>
                        <Icon
                            name="chevron-forward-outline"
                            color="white"
                            size={25}
                        />
                    </TouchableOpacity>
                   
                </Animated.View>    
            }
           
            
            
        </View>    
            
     </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    title:{
        fontSize:30,
        fontWeight:'bold',
        color:'#5856d6'

    },
    subtitle:{
        fontSize:16
    }
    
});