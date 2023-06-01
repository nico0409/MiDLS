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
    const dateInitial = new Date(moment().format());
    
    
    const formatearFechaEnCodigo = (dateString: string) => {
        
        console.log("dateSTRING: ",dateString);
        
        //let dateToFormat = dateString.split(/[\s-:/]/);
        //let dateFormated = new Date(parseInt(dateToFormat![0]), (parseInt(dateToFormat![1], 10) - 1), parseInt(dateToFormat![2], 10));        

        //return dateFormated;
        return new Date(moment(dateString).format());
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
        let yyyy = date.getFullYear();

        let dateFormated = yyyy + '/' + mm + '/' + dd*/

        let dateFormated = moment(date,'YYYY-MM-DD').format('DD/MM/YYYY');

        console.log("HANDLE CONFIRM dateFormated: ",dateFormated);
        
        hideDatePicker();

        setCardDescr && setCardDescr({ ...cardDescr, ...{ DL_IDENTIF_DT: dateFormated } })
        setDate(date);


        onChange(dateFormated, 'm38:DL_IDENTIF_DT');

    };

    const formattedDate = (d:Date) => {

        console.log("date recibido: ",d);
        console.log("date recibidoEN MOMENT: ",moment(d,'YYYY-MM-DD').format('DD/MM/YYYY'));
        console.log(" recibidoEN MOMENT: ",moment().format('DD/MM/YYYY'));
        
        
        /* let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear()); 

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;*/

        //return `${day}/${month}/${year}`;
        return moment(d,'YYYY-MM-DD').format('DD/MM/YYYY');
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