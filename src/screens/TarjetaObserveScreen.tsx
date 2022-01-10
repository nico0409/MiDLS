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
import { useNetInfo } from '@react-native-community/netinfo';
import { opacity } from '../libs/react-native-redash/src/v1/Colors';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)


interface Props extends StackScreenProps<any, any> { };
export const TarjetaObserveScreen = ({ navigation, route }: Props) => {




    const { isConnected } = useNetInfo();
    const ScreenWidt = Dimensions.get('window').width;
    const ScreenHeight = Dimensions.get('window').height;
    const { top } = useSafeAreaInsets();

    const [isVisible, setisVisible] = useState(false)
    const [term, setTerm] = useState('')
    const [placeHolder, setPlaceHolder] = useState<fieldSearchType>({ label: 'Numero de tarjeta' })



    const { allObserveList, isloading, loadAllObserve } = useAllObserve(route.params!.emplid, useIsFocused())




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


    const [seeFlatList, setSeeFlatList] = useState(true);



    useEffect(() => {
        if (term.length === 0) {

            setObserveFiltred(allObserveList)
            return setSeeFlatList(true)

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
        if (emplid.fieldValue1 !== route.params!.emplid) {

            navigation.replace(
                'TarjetaObserveScreen',
                { name: emplid.fieldValue2, emplid: emplid.fieldValue1 });
        }
    }, [emplid])


    useEffect(() => {
        if (isConnected === true) {

        }
    }, [isConnected])

    const customImgAddObsv = () => {
        return (
            <View style={{ position: 'absolute', alignSelf: 'center', top: ScreenHeight * 0.35 }}>
                <View style={{ borderWidth: 8, borderRadius: 10, borderColor: "#c7c7c7" }}>
                    <Icon name="list-outline" size={100} color="#c7c7c7" />
                    <View style={{ position: 'absolute', bottom: -30, right: -30, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ position: 'absolute', backgroundColor: colors.dlsGrayPrimary, height: 55, width: 60, borderRadius: 100 }} />
                        <Icon name="add-circle" size={50} color="#c7c7c7" />
                    </View>
                </View>
            </View>
        )
    }

    const customImgSrchErrObsv = () => {
        return (
            <View style={{ position: 'absolute', alignSelf: 'center', top: ScreenHeight * 0.33 }}>
                <Icon name="search-circle" size={170} color="#c7c7c7" />
                <View style={{ position: 'absolute', top: 66, left: 62, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="close" size={30} color={colors.dlsGrayPrimary} />
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.dlsGrayPrimary }}>

            <View style={styless.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="caret-back-outline"
                        color={colors.dlsYellowSecondary}
                        size={35} />
                </TouchableOpacity>
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
                top: 55,
                position: 'absolute',
                zIndex: 999,
                flexDirection: 'row'
            }}>


                <SearchInput
                    onDebounce={(value) => setTerm(value)}
                    style={{


                        width: ScreenWidt - 80,

                        borderRadius: 100,
                        top: (Platform.OS === 'ios') ? top : top + 10
                    }
                    }
                    term={term}
                    placeholder={placeHolder.label}
                    onSeeFlatList={setSeeFlatList}

                />
                <View style={{

                    height: 50,
                    width: 40,
                    justifyContent: 'center',
                    alignItems: 'center',

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




            <View>

                {
                    (term.length !== 0) ?
                        observeFiltered.length === 0 ? customImgSrchErrObsv() : <></>
                        :
                        allObserveList.length > 1 ? <></>
                            :
                            allObserveList.length === 0 ?
                                customImgAddObsv()
                                :
                                Object.keys(allObserveList[0]).length === 0 ?
                                    customImgAddObsv()
                                    : <></>
                }

                {<View style={{ marginVertical: 50 }}>

                    {seeFlatList && !isloading ?
                        <Wallet term={term}
                            observeFiltered={observeFiltered}
                            allObserveList={allObserveList}
                            setTerm={setTerm}
                            loadAllObserve={loadAllObserve}
                        /> :
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: ScreenHeight * 0.80,
                            width: ScreenWidt,
                            backgroundColor:colors.dlsGrayPrimary
                        }}>
                            <Chase size={48} color="#FFF" />
                        </View>
                    }
                </View>}


            </View>

            <TouchableOpacity
                activeOpacity={0.6}
                style={{ zIndex: 999, ...styles.addButtonContainer }}
                onPress={() => {
                    navigation.navigate('CreateObserveScreen')
                }}
            >
                <View style={styles.addButton} >
                    <Icon name="add-circle" size={65} color={'#ffdd00'} />
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
const styless = StyleSheet.create({

    header: {
        marginVertical: 10,
        marginHorizontal: 20,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

})