import React, { useEffect } from 'react'
import { getVersion } from 'react-native-device-info';
import { Platform } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import checkVersion from 'react-native-store-version';


export const CheckUpdateAndroid = async () => {
   // const { isConnected } = useNetInfo();

  let needsUpdate:boolean=false;


   
        const init = async () => {
            try {
                const check = await checkVersion({
                    version: getVersion(), // app local version
                    androidStoreURL: 'https://play.google.com/store/apps/details?id=com.midls',
                });
                console.log(check);
                if (check.result === "new") {
                    return true; 

                }else return false; 
            } catch (e) {
                console.log(e);
                 return false;
            }


        };

     
        if (Platform.OS == 'android') {
        
            
//            if (isConnected === true) {
                
                needsUpdate  =await init()
  //          }
          
     }

    return needsUpdate
}
