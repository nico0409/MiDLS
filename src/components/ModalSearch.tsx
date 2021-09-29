
import React,{useState} from 'react'

import { View, Modal, Text, Button, SectionList } from 'react-native';
import { listSearchOptions } from '../data/listSearchOptios';
import { HeaderTitle } from './HeaderTitle';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { colors } from '../Themes/DlsTheme';



interface Props {
    isVisible:boolean
    setisVisible:React.Dispatch<React.SetStateAction<boolean>>
}
export const ModalSearch = ({isVisible,setisVisible}:Props) => {
   const [state, setstate] = useState(0)
    return (
        <View>
          <Modal animationType='fade'
            visible={isVisible}
            transparent
            >
                <View style={{
                    flex:1,
             //       height:100,
               //     width:100,
                    backgroundColor:'rgba(0,0,0,0.3)',
                    top:120,
                    left:20
                
                   
                    
                    
                }}>
                    {/* contenido del modal */}
                    <View style={{
                        backgroundColor:'white',
                        width:200,
                        height:300,
                        justifyContent:'center',
                        alignItems:'center',
                        shadowOffset:{
                            width:0,
                            height:10
                        },
                        elevation:10,
                        borderRadius:15,
                        shadowOpacity:0.25
                        
                        

                        }}>
                      {/*  
                       <SectionList
                       sections={listSearchOptions}
                       ListHeaderComponent={()=> <HeaderTitle title='Filtrar por:'></HeaderTitle>}
                       
                       stickySectionHeadersEnabled
                       renderItem={({item})=><Text style={{}}>{item}</Text>}
                       keyExtractor={(item,index)=>item+index}
                      
                        
                        showsVerticalScrollIndicator={false}
                       /> */}

<RadioForm
          radio_props={listSearchOptions}
          initial={0}
          onPress={(value) => {setstate(value)}}
          animation={true}
          buttonColor={'#50C900'}
          labelColor='green'
        
      
         
         
          
        />
                        <Button
                        title='Cerrar'
                        onPress={()=>setisVisible(false)}
                        ></Button>
                    </View>

                </View>
            
            </Modal>  
        </View>
    )
}
