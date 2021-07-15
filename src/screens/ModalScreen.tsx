import React , {useState} from 'react'
import { Button, Modal, Text, View } from 'react-native'
import { HeaderTitle } from '../components/HeaderTitle'




export const ModalScreen = () => {

    const [isVisible, setisVisible] = useState(true)

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
                    justifyContent:'center',
                    alignItems:'center'
                    
                    
                }}>
                    {/* contenido del modal */}
                    <View style={{
                        backgroundColor:'white',
                        width:200,
                        height:200,
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
                        <HeaderTitle title='Modal'/>
                        <Text style={{fontSize:16,fontWeight:'300',marginBottom:20}}>Cuerpo del modal</Text>
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
