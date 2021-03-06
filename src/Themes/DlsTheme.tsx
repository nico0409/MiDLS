import { StyleSheet,Dimensions} from "react-native";

const {width,height} = Dimensions.get('window');

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
  //dlsBluePrimary: 'rgba(0,183,237,1)',
  dlsBluePrimary: '#0087ba',
  //dlsBluePrimary:'rgba(0,183,237,0.6)',
  /* dlsYellowSecondary: 'rgba(245,217,47,1)', */
  dlsYellowSecondary: '#D5BE14',
  //dlsGrayPrimary: 'rgba(66,73,78,1)',
  dlsGrayPrimary:'#08111c',
  dlsWhiteBackGround: 'rgba(243,239,239,0.9)',
  dlsBtonColosWhite: 'rgba(243,239,239,0.6)',
  dlsTextwhite: '#ffffff',
  dlsTextBlack: '#000000',
  dlsBotonBlack:'#2b2c32',
  
}
export const fillColorBtn=colors.dlsBluePrimary
export const unfillColorBtn= 'rgba(243,239,239,0.8)'

export const styles = StyleSheet.create({

  globalMargin: {
    marginHorizontal: 20,

  },
  header: {
    marginVertical: 10,
    marginRight: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  DLSLogoBG: {
    
    width: width,
    height:height,
    resizeMode: 'contain',
  },
  title: {

    fontSize: 35,
    fontWeight: 'bold'
  }, addButton: {
    width: 65,
    height: 65,
    opacity: 1,
    //backgroundColor:'white',
    borderRadius: 100,

    alignItems: 'center',
    justifyContent: 'center',

  }, addButtonContainer: {
    position: 'absolute',
    width: 65,
    height: 65,
    bottom: 20,
    right: 25,

    // alignItems:'center',
    // justifyContent:'center',
    //backgroundColor:'red',
    borderRadius: 100,

  }

});
