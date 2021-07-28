import React from 'react'
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { listRedesDLS } from '../data/listRedes';
import { IconDescrRedes } from './IconDescrRedes';
import { DataRedes } from '../interfaces/PropsRedes';


interface Props {
lista:DataRedes[];
setVisible :React.Dispatch<React.SetStateAction<boolean>>
setPressedRow:React.Dispatch<React.SetStateAction<number>>
owner:'DLS'|'ARCHER'
}


export const FlatListRedes = ({lista,setVisible,setPressedRow,owner}:Props) => {
   
   return (
      
        <FlatList
        horizontal={true}   
       contentContainerStyle={{}}
       data={  lista.filter((e)=>{return e.props.owner===owner})}
       keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => {
          if (owner==='ARCHER')index=index+4;
        return(
           <View style={styles.container}>
              <TouchableOpacity
              onPress={()=>(setVisible(true),setPressedRow(index))}
              >
               <IconDescrRedes
                       type={item.props.type}
                       owner={item.props.owner}
                       nameIcon={item.props.nameIcon}
                       requireImage={item.props.requireImage}
                       color={item.props.color}
                       size={item.props.size}
                       descr={item.props.descr}
                       index={item.id}
                   />
             </TouchableOpacity> 
           </View>
      ) }
      }
        />
        )

}

const styles = StyleSheet.create({
    container: {
        width:70,
        
      //  backgroundColor:'red',
      //  justifyContent:'flex-end'
      
      
    }})