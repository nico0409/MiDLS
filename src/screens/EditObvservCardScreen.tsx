import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, useWindowDimensions, StyleSheet, Text, TouchableOpacity, Platform, ToastAndroid, Alert, Modal } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Chase } from 'react-native-animated-spinkit';

import { M38GetCompIntfcDLHRTAOBSERVCIResponse, MeuItemType } from '../interfaces/prompInterfaces';
import { RoutstackParams } from '../Navigation/StackNavigatorObserve';
import { UseOneGetObserve } from '../hooks/UseOneGetObserve';
import List, { List as ListModel } from "../components/AcordionList/List";
import { colors } from '../Themes/DlsTheme';
import { EditObservCard } from '../components/EditObserveCard';
import { AuthContext as AuthcontextGeneral } from '../context/AuthContext'






const list: ListModel = {
    name: "Registro",
    items: [
        { name: " ", points: "0" },
    ],
};

const list2: ListModel = {
    name: "Comentarios",
    items: [
        { name: " ", points: "0" },
    ],
};

const list3: ListModel = {
    name: "Preguntas",
    items: [
        { name: " ", points: "0" },
    ],
};

const list4: ListModel = {
    name: "Reglas de oro",
    items: [
        { name: " ", points: "0" },
    ],
};

interface Props extends StackScreenProps<RoutstackParams, 'EditObvservCardScreen'> { };

type messageParam = 'RuleGold' | 'Questions';

export const EditObvservCardScreen = ({ navigation, route }: Props) => {

    const { setReloadCardList } = useContext(AuthcontextGeneral);

    const { isloading, loadObserveCard, form, onChange, stateSend } = UseOneGetObserve(route.params);

    const [editEnabled, setEditEnabled] = useState(false);
    const [saveEnabled, setSaveEnabled] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [messageModal, setMessageModal] = useState('');
    const [initialState, setinitialState] = useState<M38GetCompIntfcDLHRTAOBSERVCIResponse | undefined>();
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        setinitialState(stateSend);
    }, [isloading])

    useEffect(() => {
        if (initialState !== undefined && JSON.stringify(stateSend) !== JSON.stringify(initialState)) {
            //setEditAble(true) esto se activa cuando hay un cambio
            setSaveEnabled(true)
        }
    }, [stateSend])

    const { height, width } = useWindowDimensions();

    const menus: MeuItemType[] = [
        { MeuItemType: 'Registro' },
        { MeuItemType: 'Comentarios' },
        { MeuItemType: 'Preguntas' },
        { MeuItemType: 'ReglasOro' },
    ]

    const alertSend = (sended: boolean) => {
        let msg = '';

        if (sended) {
            msg = 'Tarjeta guardada exitosamente.';
            setMessageModal(msg);
            setEditEnabled(false);
            setSaveEnabled(false);
        } else {
            msg = 'No se pudo procesar la modificación, intente nuevamente.';
            setMessageModal(msg);
        }
        setVisibleModal(true)

        /* if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            Alert.alert(msg);
        } */
    }
    const questionsErrorMessage = (messageType:messageParam) => {

        var messageStrType = 'categoría en la sección Preguntas';

        if(messageType === 'RuleGold'){
            messageStrType = 'Regla de Oro';
        }

        const msg = "Debe seleccionar al menos una " + messageStrType + ".";
                if (Platform.OS === 'android') {
                    ToastAndroid.showWithGravityAndOffset(msg,
                        ToastAndroid.LONG,
                        ToastAndroid.TOP,
                        25,
                        50)
                } else {
                    Alert.alert(msg);
                }
    };

    const validateQuestions = () =>{
        if(form['m38:DL_ORIGEN'] !== "S"){

            if(!form['m38:DL_EQPROTPER'] &&
            !form['m38:DL_PROCTRAB'] &&
            !form['m38:DL_EQYHERR']  &&
            !form['m38:DL_REACCPERS']  &&
            !form['m38:DL_ORDYLIMPIE']  &&
            !form['m38:DL_MEDIOAMB']  &&
            !form['m38:DL_POSIPERS']  &&
            !form['m38:DL_CONTYPER'] ){
                questionsErrorMessage('Questions');
                return;
            };

            if(form['m38:DL_SEG_VIAL']!=='Y' &&
                form['m38:DL_TRBJ_ALT']!=='Y' &&
                form['m38:DL_LN_FUEGO']!=='Y' &&
                form['m38:DL_ESPAC_CONFIN']!=='Y' &&
                form['m38:DL_HER_EQUIP']!=='Y' &&
                form['m38:DL_AIS_ENERG']!=='Y' &&
                form['m38:DL_OP_IZADO']!=='Y' &&
                form['m38:DL_PERM_TRABAJO']!=='Y' &&
                form['m38:DL_MAN_CAMBIO']!=='Y'){
                questionsErrorMessage('RuleGold');
                return;
            };

            EditObservCard({ form: stateSend!, alertSend, setReloadCardList })

        }else{
            EditObservCard({ form: stateSend!, alertSend, setReloadCardList })
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ ...styles.container, height: height }}>
                <View style={{ height: '10%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <TouchableOpacity
                        onPress={() => { navigation.pop() }}
                    >
                        <Icon name="chevron-back-outline" size={40} color={colors.dlsYellowSecondary} />
                    </TouchableOpacity>

                    {(route.params.cardOffline)===true? <></>:
                     editEnabled ?
                        <TouchableOpacity
                            disabled={!saveEnabled}
                            onPress={() => {
                                validateQuestions();
                            }}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{
                                    color: 'white',
                                    alignSelf: 'center',
                                    paddingRight: 10,
                                    fontSize: 17,
                                    fontWeight: 'bold'
                                }}
                                >
                                    Guardar
                                </Text>
                                <AwesomeIcon name="save" size={30} color={saveEnabled ? colors.dlsYellowSecondary : colors.dlsWhiteBackGround} />
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => {
                                setEditEnabled(true)
                            }}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{
                                    color: 'white',
                                    alignSelf: 'center',
                                    paddingRight: 10,
                                    fontSize: 17,
                                    fontWeight: 'bold'
                                }}
                                >
                                    Editar
                                </Text>
                                <AwesomeIcon name="edit" size={30} color={colors.dlsYellowSecondary} />
                            </View>
                        </TouchableOpacity>
                    }

                </View>
                {!isloading ?

                    form['m38:DL_NTARJETA'] === undefined ?
                        <>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center', paddingHorizontal: 35 }}>
                                <View>
                                    <Text style={{ color: 'white', fontSize: 40, textAlign: 'center', marginBottom: 20, fontWeight: 'bold' }}>
                                        No se han podido cargar los detalles correctamente.
                                    </Text>
                                    <Text style={{ color: 'white', fontSize: 26, textAlign: 'center', marginBottom: 20 }}>
                                        Es posible que se detectara una conexión a internet y la tarjeta se haya enviado automáticamente. Puede volver a la lista de tarjetas y verificar que la suya se encuentre allí.
                                    </Text>
                                </View>
                            </View>
                        </>
                        :
                        <>
                            <View style={styles.containerTitle}>
                                <Text style={styles.title}>{`Tarjeta Número:`}</Text>
                                <Text style={styles.title}>{`${form['m38:DL_NTARJETA']}`}</Text>
                            </View>

                            <ScrollView ref={scrollViewRef} scrollEnabled={false} showsVerticalScrollIndicator={false}>
                                <List {...{ list }} MeuItemType={menus[0]} form={form} onChange={onChange} scrollViewRef={scrollViewRef} displayOnly={!editEnabled} />
                                <List {...{ list: list2 }} MeuItemType={menus[1]} form={form} onChange={onChange} scrollViewRef={scrollViewRef} displayOnly={!editEnabled} />
                                <List {...{ list: list3 }} MeuItemType={menus[2]} form={form} onChange={onChange} scrollViewRef={scrollViewRef} displayOnly={!editEnabled} />
                                <List {...{ list: list4 }} MeuItemType={menus[3]} form={form} onChange={onChange} scrollViewRef={scrollViewRef} displayOnly={!editEnabled} />
                            </ScrollView>
                        </>
                    :
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: colors.dlsGrayPrimary }}>
                        <Chase size={48} color="#FFF" />
                    </View>
                }

                <Modal
                    animationType='slide'
                    transparent
                    visible={visibleModal}
                >

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{
                            width: '80%',
                            height: '30%',
                            backgroundColor: '#1C1C20',
                            borderRadius: 30,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 6,
                            },
                            shadowOpacity: 0.39,
                            shadowRadius: 8.30,
                            elevation: 13,
                        }}>
                            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                <View style={{ flex:1, marginHorizontal: 10, justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 26, fontWeight: 'bold' }}>
                                        {messageModal}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => { setVisibleModal(false) }}
                                    style={{
                                        height: '25%',
                                        borderColor: 'white',
                                        borderWidth: 4,
                                        borderRadius: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: 15
                                    }}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Cerrar Ventana</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dlsGrayPrimary,
        paddingHorizontal: 16
    },
    containerTitle: {
        /* justifyContent: 'center', */
        alignItems: 'center',
        height: '10%'
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: colors.dlsTextwhite
    },
});