import { StyleSheet } from "react-native";

export const styless = StyleSheet.create({
  containerWebView: {
    flex: 1,
    paddingTop: '5%',
    justifyContent: 'center',
  },
  webview: {
    flex: 1,

  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  }
})

export const colors = {
  dlsBluePrimary: 'rgba(0,183,237,1)',
  dlsYellowSecondary: 'rgba(245,217,47,1)',
  dlsGrayPrimary: 'rgba(66,73,78,1)',
  dlsWhiteBackGround: 'rgba(243,239,239,0.9)'
}

export const styles = StyleSheet.create({
   
  globalMargin:{
      marginHorizontal:20,
      
  },
  header:{
 marginVertical:10,
marginRight:20 ,

flexDirection:'row',
justifyContent:'space-between',
alignItems:'center'
 


  },
  pokebolaBG:{
      position:'absolute',
      top:-100,
      right:-100,
      width:300,
      height:300,
      opacity:0.2
      
  },
  title:{

      fontSize:35,
      fontWeight:'bold'
  },pokebolaIcon:{
      width:60,
      height:60,
      opacity:0.9, 
      backgroundColor:'white',
      borderRadius:100,
      alignItems:'center',
      justifyContent:'center',
      
  },pokebolaContainer:{
      position:'absolute',
      width:60,
      height:60,
      bottom:50,
      right:10,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'red',
      borderRadius:100,

  }



});
