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
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { Loading } from '../components/Loading';
import { ModalSearch } from '../components/ModalSearch';



interface Props extends DrawerScreenProps<any, any> { };
export const TarjetaObserveScreen = ({ navigation, route }: Props) => {

    const ScreenWidt = Dimensions.get('window').width;
    const { top } = useSafeAreaInsets();

    const [isVisible, setisVisible] = useState(false)
    const [term, setTerm] = useState('')

    const { allObserveList, isloading, loadAllObserve } = useAllObserve()
    const [observeFiltered, setObserveFiltred] = useState<DlhrAllObserve[]>([])

    useEffect(() => {
        if (term.length === 0) {

            return setObserveFiltred(allObserveList)

        }
        if (isNaN(Number(term))) {
            setObserveFiltred(
                allObserveList.filter(
                    observe => observe.NroTarjeta!.toLocaleLowerCase()
                        .includes(term.toLocaleLowerCase())
                )
            )
        } else {
            const NroTarjeta = allObserveList.find((observe) => observe.NroTarjeta === term)
            setObserveFiltred(
                (NroTarjeta) ? [NroTarjeta] : []
            )
        }


    }, [term])


    if (isloading) {
        return (
            <Loading />
        )
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.dlsGrayPrimary }}>

            <View style={styles.header}>
                <TouchableOpacity>
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
                        }}>Alan Chaile</Text>
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
                        zIndex: 998,
                        width: ScreenWidt - 40,
                        top: (Platform.OS === 'ios') ? top : top + 10
                    }
                    }
                    setisVisible={setisVisible}
                />
            </View>




            <View >

                <View style={{ alignItems: 'center' }}>
                    <FlatList

                        numColumns={1}
                        showsVerticalScrollIndicator={false}
                        data={(term.length !== 0) ? observeFiltered : allObserveList}
                        keyExtractor={(observe) => observe.NroTarjeta!}
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
                    />
                </View>

                <TouchableOpacity
                    activeOpacity={0.6}
                    style={{ zIndex: 999, ...styles.pokebolaContainer }}
                    onPress={() => { navigation.navigate('CreateObserveScreen') }}
                >

                    <View style={styles.pokebolaIcon} >

                        <AwesomeIcon name="plus-circle" size={60} color={colors.dlsBluePrimary} />


                    </View>
                </TouchableOpacity>


            </View>
            <ModalSearch isVisible={isVisible} setisVisible={setisVisible} />
        </SafeAreaView>

    )


}
