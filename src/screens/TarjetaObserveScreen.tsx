import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, SafeAreaView, Platform, FlatList, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { SearchInput } from '../components/SearchInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, styles } from '../Themes/DlsTheme';
import { DlhrAllObserve, fieldSearchType } from '../interfaces/prompInterfaces';
import { useAllObserve } from '../hooks/useAllObserve';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalSearch } from '../components/ModalSearch';
import { StackScreenProps } from '@react-navigation/stack';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import Wallet from '../components/Wallet';
import { Chase } from 'react-native-animated-spinkit'
import { ModalPromptEmplid } from '../components/ModalPromptEmplid';

import { useIsFocused } from '@react-navigation/native';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

/* interface Props extends DrawerScreenProps<any, any> { }; */
interface Props extends StackScreenProps<any,any>{};
export const TarjetaObserveScreen = ({ navigation, route }: Props) => {




    const ScreenWidt = Dimensions.get('window').width;
    const ScreenHeight = Dimensions.get('window').height;
    const { top } = useSafeAreaInsets();

    const [isVisible, setisVisible] = useState(false)
    const [term, setTerm] = useState('')
    const [placeHolder, setPlaceHolder] = useState<fieldSearchType>({ label: 'Numero de tarjeta' })

    const { allObserveList, isloading, loadAllObserve } = useAllObserve(route.params!.emplid,useIsFocused())

    const [observeFiltered, setObserveFiltred] = useState<DlhrAllObserve[]>([])
  
    const [statePropmpEmp, setstatePropmpEmp] = useState(false)
    const [emplid, setEmplid] = useState<
        {
            fieldValue1: string;
            fieldValue2: string;
        }>({
            fieldValue1: route.params!.emplid,
            fieldValue2: route.params!.name
        })
    const y = new Animated.Value(0);

    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }],
        { useNativeDriver: true })

    const [seeFlatList, setSeeFlatList] = useState(true);

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

        setSeeFlatList(true);

    }, [term])

    useEffect(() => {
         if( emplid.fieldValue1!==route.params!.emplid)
       {console.log("entre");
       
        navigation.replace(
            'TarjetaObserveScreen',
            { name: emplid.fieldValue2, emplid: emplid.fieldValue1 }); 
       }
    }, [emplid])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.dlsGrayPrimary }}>

            <View style={styless.header}>
                {/* <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="caret-back-outline"
                        color={colors.dlsYellowSecondary}
                        size={35} />
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => setstatePropmpEmp(true)}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="person-outline"
                            color={colors.dlsYellowSecondary}
                            size={20} />
                        <Text style={{
                            fontSize: 15, fontWeight: 'bold', fontFamily: 'Stagsans-Light',
                            color: colors.dlsYellowSecondary
                        }}>{emplid.fieldValue2}</Text>
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
                    onSeeFlatList={setSeeFlatList}

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
                <View style={{ marginVertical: 50 }}>

                    {seeFlatList && !isloading ?
                        <Wallet term={term}
                            observeFiltered={observeFiltered}
                            allObserveList={allObserveList}
                            setTerm={setTerm}
                        /> :
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: ScreenHeight * 0.80,
                            width: ScreenWidt
                        }}>
                            <Chase size={48} color="#FFF" />
                        </View>
                    }
                </View>


            </View>
            <TouchableOpacity
                activeOpacity={0.6}
                style={{ zIndex: 999, ...styles.addButtonContainer }}
                onPress={() => { /* navigation.replace('CreateObserveScreen') */
                navigation.navigate('CreateObserveScreen')
             }}
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

            <ModalPromptEmplid
             setstatePropmpEmp={setstatePropmpEmp} 
            statePropmpEmp={statePropmpEmp}
            setemplid={setEmplid} />
        </SafeAreaView>

    )


}
const styless=StyleSheet.create({

header: {
        marginVertical: 10,
        paddingTop:10,
        paddingLeft:20,
    
        flexDirection: 'row-reverse',
        
        alignItems: 'center'
}

})