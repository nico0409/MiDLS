import React, { useState, useEffect } from 'react'
import { Text, View, Dimensions, SafeAreaView, Platform, Image, FlatList, ActivityIndicator, TouchableOpacity, Modal, Button } from 'react-native';
import { SearchInput } from '../components/SearchInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ObserveCard } from '../components/ObserveCard';
import { colors, styles } from '../Themes/DlsTheme';
import { GetStorage, Asingstorage } from '../components/Storage';
import { PromptObserve, StorageTypes, DlhrAllObserve } from '../interfaces/prompInterfaces';
import { GetPrompt } from '../components/GetPrompt';
import { GetAllObserve } from '../components/GetAllObserve';
import { useAllObserve } from '../hooks/useAllObserve';
import { ToggleDrawerHeader } from '../components/ToggleDrawerHeader';
import { DrawerScreenProps } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';
import { Loading } from '../components/Loading';
import { ModalSearch } from '../components/ModalSearch';
import { StackScreenProps } from '@react-navigation/stack';
import { RoutstackParams } from '../Navigation/StackNavigatorObserve';
import IconAwesome from 'react-native-vector-icons/FontAwesome';




interface Props extends DrawerScreenProps<any, any> { };
interface Propstack extends StackScreenProps<RoutstackParams, 'TarjetaObserveScreen'> {

}
export const TarjetaObserveScreen = ({ navigation, route }: Props) => {




    const ScreenWidt = Dimensions.get('window').width;
    const { top } = useSafeAreaInsets();

    const [isVisible, setisVisible] = useState(false)
    const [term, setTerm] = useState('')

    const { allObserveList, isloading, loadAllObserve } = useAllObserve(route.params!.emplid)
    const [observeFiltered, setObserveFiltred] = useState<DlhrAllObserve[]>([])

    useEffect(() => {
        if (term.length === 0) {

            return setObserveFiltred(allObserveList)

        }
       
            setObserveFiltred(
                allObserveList.filter(
                    observe => observe.NroTarjeta!.toLocaleLowerCase()
                        .includes(term.toLocaleLowerCase())
                )
            )
        
        


    }, [term])


    if (isloading) {
        return (
            <Loading />
        )
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.dlsGrayPrimary }}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="caret-back-outline"
                        color={colors.dlsYellowSecondary}
                        size={35} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="person-outline"
                            color={colors.dlsYellowSecondary}
                            size={20} />
                        <Text style={{
                            fontSize: 15, fontWeight: 'bold', fontFamily: 'Stagsans-Light',
                            color: colors.dlsYellowSecondary
                        }}>{route.params!.name}</Text>
                    </View>
                </TouchableOpacity>

            </View>

            <View style={{
                marginHorizontal: 20,
                /* position: 'absolute',
                zIndex: 999, */
            }}>


                <SearchInput
                    onDebounce={(value) => setTerm(value)}
                    style={{
                        position: 'absolute',
                        zIndex: 997,
                        width: ScreenWidt - 80,
                        left: 30,
                        borderRadius: 100,
                        top: (Platform.OS === 'ios') ? top : top + 10
                    }
                    }
                    
                />
                <View style={{
                        zIndex: 999,
                        height: 50,
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        left: -10,
                        top: 6,
                    }}>
                <TouchableOpacity

                    onPress={() => {setisVisible(true)}}
                    
                    style={{
                        width:'100%',
                        height:'100%',
                        
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    
                        <IconAwesome
                            name="filter"
                            color={colors.dlsBtonColosWhite}
                            size={25}
                        />
                    
                </TouchableOpacity>
                </View>
            </View>




            <View >

                <View style={{ alignItems: 'center' }}>

                    {allObserveList[0].NroTarjeta !== undefined ?
                        <FlatList

                            numColumns={1}
                            showsVerticalScrollIndicator={false}
                            data={(term.length !== 0) ? observeFiltered : allObserveList}
                            keyExtractor={(observe, index) => observe.NroTarjeta! + index.toString()}
                            renderItem={({ item }) => <ObserveCard observe={item} setTerm={setTerm} />
                            }

                            //onEndReached={loadPokemons}
                            onEndReachedThreshold={0.4}
                            ListHeaderComponent={<Text style={{
                                ...styles.globalMargin,
                                ...styles.title,
                                top: top + 20,
                                marginBottom: top + 10,
                                paddingBottom: 10
                            }}></Text>}
                        /> : <View></View>}
                </View>




            </View>
            <TouchableOpacity
                activeOpacity={0.6}
                style={{ zIndex: 999, ...styles.addButtonContainer }}
                onPress={() => { navigation.navigate('CreateObserveScreen') }}
            >

                <View style={styles.addButton} >

                    <Icon name="add-circle" size={65} color={colors.dlsBluePrimary} />


                </View>
            </TouchableOpacity>
            <ModalSearch isVisible={isVisible} setisVisible={setisVisible} />
        </SafeAreaView>

    )


}
