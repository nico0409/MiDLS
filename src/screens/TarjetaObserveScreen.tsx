import React, { useState, useEffect } from 'react'
import { Text, View, Dimensions, SafeAreaView, Platform, Image, FlatList, ActivityIndicator, TouchableOpacity, Modal, Button, Animated } from 'react-native';
import { SearchInput } from '../components/SearchInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ObserveCard } from '../components/ObserveCard';
import { colors, styles } from '../Themes/DlsTheme';
import { GetStorage, Asingstorage } from '../components/Storage';
import { PromptObserve, StorageTypes, DlhrAllObserve, fieldSearchType } from '../interfaces/prompInterfaces';
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
import Wallet from '../components/Wallet';



const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)


interface Props extends DrawerScreenProps<any, any> { };

export const TarjetaObserveScreen = ({ navigation, route }: Props) => {




    const ScreenWidt = Dimensions.get('window').width;
    const { top } = useSafeAreaInsets();

    const [isVisible, setisVisible] = useState(false)
    const [term, setTerm] = useState('')
    const [placeHolder, setPlaceHolder] = useState<fieldSearchType>({ label: 'Numero de tarjeta' })
    const { allObserveList, isloading, loadAllObserve } = useAllObserve(route.params!.emplid)
    const [observeFiltered, setObserveFiltred] = useState<DlhrAllObserve[]>([])
    /* const [searchValue, setsearchValue] = useState(0)
    const [typeSearh, setTypeSearch] = useState<fieldSearchType>({ type: 'DLHR_NTARJETA' })
     */

    const y = new Animated.Value(0);
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }],
        { useNativeDriver: true })
    useEffect(() => {
        if (term.length === 0) {

            return setObserveFiltred(allObserveList)

        }
        switch (placeHolder.type) {
            case 'DLHR_NTARJETA':
                setObserveFiltred(
                    allObserveList.filter(
                        observe => observe.NroTarjeta?.toLocaleLowerCase()
                            .includes(term.toLocaleLowerCase())
                    )
                )
                break;
            case 'DLHR_BUSSINES':
                setObserveFiltred(
                    allObserveList.filter(
                        observe => observe.BUSINESS_UNIT?.toLocaleLowerCase()
                            .includes(term.toLocaleLowerCase())
                    )
                )
                break;
            case 'DLHR_EQUIPO':
                setObserveFiltred(
                    allObserveList.filter(
                        observe => observe.IDEquipo?.toString()
                            .includes(term.toLocaleLowerCase())
                    )
                )
                break;
            case 'DLHR_FECHA':
                setObserveFiltred(
                    allObserveList.filter(
                        observe => observe.DL_IDENTIF_DT?.toString()
                            .includes(term.toLocaleLowerCase())
                    )
                )
                break;
            case 'DLHR_TURNO':
                setObserveFiltred(
                    allObserveList.filter(
                        observe => observe.DL_TURNO?.toString()
                            .includes(term.toLocaleLowerCase())
                    )
                )
                break;
            default:
                break;
        }



    }, [term])


    if (isloading) {
        return (
            <Loading />
        )
    }




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:colors.dlsGrayPrimary}}>

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
                    term={term}
                    placeholder={placeHolder.label}

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

                        onPress={() => { setisVisible(true) }}

                        style={{
                            width: '100%',
                            height: '100%',

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
                <View style ={{marginVertical:50 }}>

                    <Wallet term={term} 
                    observeFiltered={observeFiltered} 
                     allObserveList={ allObserveList} 
                     setTerm={setTerm} 
                     />
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
            <ModalSearch
                isVisible={isVisible}
                setisVisible={setisVisible}
                setTerm={setTerm}
                setPlaceHolder={setPlaceHolder}
            />
        </SafeAreaView>

    )


}
