import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import { MyProfileScreen } from '../screens/MyProfileScreen';
import { MapScreen } from '../screens/MapScreen';
import { NewsScreen } from '../screens/NewsScreen';
import { ToggleDrawerHeader } from '../components/ToggleDrawerHeader';
import { colors } from '../Themes/DlsTheme';
import { Backgrond } from '../../../pruductosApp/src/components/Backgrond';


interface Props extends DrawerScreenProps<any, any> { };

const Tab = createMaterialTopTabNavigator();

export const TopTapNavigator = ({ navigation, route }: Props) => {
  return (
    <SafeAreaView style={styles.container}>

      <ToggleDrawerHeader navigation={navigation} route={route} />

      <Tab.Navigator
      
     /*  sceneContainerStyle={{
        backgroundColor: colors.dlsGrayPrimary
      }} */
        swipeEnabled={false}
        
        tabBarOptions={{
          showIcon: true,
          showLabel: false,
          pressColor: colors.dlsYellowSecondary,
          activeTintColor: colors.dlsYellowSecondary,
          inactiveTintColor: colors.dlsBluePrimary,
          indicatorStyle: { backgroundColor: colors.dlsBluePrimary },
          style: {
            paddingVertical: 6,
            backgroundColor: colors.dlsGrayPrimary,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.13,
            shadowRadius: 5,
            elevation: 3,
          }
          

        }}

        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused }) => {

            let iconName: string = '';
            switch (route.name) {
              case 'NewScreen':
                iconName = 'newspaper'
                break;
              case 'MapScreen':
                iconName = 'map'
                break;

              case 'MyProfileScreen':
                iconName = 'person-sharp'
                break;



            }

            return <Icon name={iconName} size={25} color={color} />
          }
        })}

      >
        <Tab.Screen name="NewScreen" component={NewsScreen} options={{ title: 'Home' }} />
        <Tab.Screen name="MapScreen" component={MapScreen} />
        <Tab.Screen name="MyProfileScreen" component={MyProfileScreen} />
      </Tab.Navigator>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});