import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { DlhrAllObserve, M38GetCompIntfcDLHRTAOBSERVCIResponse, objUseForm } from '../interfaces/prompInterfaces';
import { colors } from '../Themes/DlsTheme';
import moment from 'moment';

interface Props {
    onChange: (value: string, field: keyof objUseForm) => void;
    cardDescr?: DlhrAllObserve;
    setCardDescr?: React.Dispatch<React.SetStateAction<DlhrAllObserve>>;
    disabled?: boolean;
    form?: M38GetCompIntfcDLHRTAOBSERVCIResponse
}

const { width } = Dimensions.get('window')

export const DatePickerSelect = ({ onChange, form, cardDescr, setCardDescr, disabled = false }: Props) => {

    //const dateInitial = new Date();
    /* date picker tiene un problema para calcular la zona horaria, se investigo que para que tome el dia correcto, se debe definir el actual date pero debe ser a partir de las 3 am */
    //const dateInitial = new Date(moment().format('YYYY-MM-DD').concat('T04:00:00.000Z'));
    //d.setHours(d.getHours() - (new Date()).getTimezoneOffset()/60);

    const dateInitial = new Date();
    /* console.log("con dateInitial",dateInitial);
    console.log("moment().format();",moment().format('DD/MM/YYYY'));
    console.log("fecha card descr",form?.['m38:DL_IDENTIF_DT']);
    console.log("fecha form",cardDescr?.DL_IDENTIF_DT); */
    
    
    
    
    
    const formatearFechaEnCodigo = (dateString: string) => {
        
        let dateToFormat = dateString.split(/[\s-:/]/);
        let dateFormated = new Date(parseInt(dateToFormat![0]), (parseInt(dateToFormat![1], 10) - 1), parseInt(dateToFormat![2], 10));

        return dateFormated;
    }
        
    const [date, setDate] = useState(form?.['m38:DL_IDENTIF_DT'] ? formatearFechaEnCodigo(form?.['m38:DL_IDENTIF_DT']) : dateInitial);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        console.log("se ejecuta handle confirm");
        
        /*let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = date.getFullYear();*/

        let dd = moment(date,'YYYY-MM-DD').format('D').padStart(2, '0');
        let mm = moment(date,'YYYY-MM-DD').format('M').padStart(2, '0'); 
        let yyyy = moment(date,'YYYY-MM-DD').format('Y');

        let dateFormated = yyyy + '/' + mm + '/' + dd

        console.log("HANDLE CONFIRM dateFormated: ",dateFormated);
        
        hideDatePicker();

        setCardDescr && setCardDescr({ ...cardDescr, ...{ DL_IDENTIF_DT: dateFormated } })
        setDate(date);


        onChange(dateFormated, 'm38:DL_IDENTIF_DT');

    };

    const formattedDate = (d:Date) => {

        /* let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear()); */
        /* console.log('formattedDate:',moment(d));
        console.log('formattedDate:',moment(d).format());
        console.log('formattedDateformartd:',moment(d).format('D'));
        console.log('formattedDateMonth:',moment(d).format('M'));
        console.log('formattedDateYear:',moment(d).format('Y')); */
        
        let month = moment(d,'YYYY-MM-DD').format('M');
        let day = moment(d,'YYYY-MM-DD').format('D');
        const year = moment(d,'YYYY-MM-DD').format('Y'); 

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return `${day}/${month}/${year}`;
    }

    return (
        <View style={{ marginVertical: 10 }}>
            <View style={{ paddingLeft: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Fecha de Identificación</Text>
            </View>
            <View style={{ marginTop: 5, flexDirection: 'row' }}>
                <TouchableOpacity
                    disabled={disabled}
                    onPress={showDatePicker}>
                    <View style={styles.btnContainer}>
                        <Text style={{ color: 'white', fontSize: 20 }}>{formattedDate(date)}</Text>
                        {!disabled &&
                            <Icon name="calendar" size={26} color={colors.dlsYellowSecondary} style={{ right: 13 }} />
                        }
                    </View>
                </TouchableOpacity>
            </View>

            <DateTimePickerModal
                date={date}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                maximumDate={dateInitial}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        height: 50,
        width: width * 0.87,
        borderRadius: 15,
        backgroundColor: '#2b2c32',
        justifyContent: 'space-between',
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        //ios
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        //android
        elevation: 15
    },
})