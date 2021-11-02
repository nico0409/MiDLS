import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { DlhrAllObserve, objUseForm } from '../interfaces/prompInterfaces';
import { colors } from '../Themes/DlsTheme';

interface Props {
    onChange: (value: string, field: keyof objUseForm) => void;
    cardDescr?: DlhrAllObserve;
    setCardDescr?: React.Dispatch<React.SetStateAction<DlhrAllObserve>>;
}

const { width } = Dimensions.get('window')

export const DatePickerSelect = ({ onChange, cardDescr, setCardDescr }: Props) => {

    //datePicker
    const dateInitial = new Date();
    console.log(dateInitial);
    

    const [date, setDate] = useState(dateInitial);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        hideDatePicker();
        setDate(date);
        (setCardDescr && setCardDescr({ ...cardDescr, ...{ DL_IDENTIF_DT: date.toISOString().split('T')[0] } }))
        onChange(date.toISOString().split('T')[0], 'm38:DL_IDENTIF_DT');
    };

    return (
        <>
            <View style={{ marginVertical: 10, flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={showDatePicker}>
                    <View style={styles.btnContainer}>
                        <Text style={{ color: 'white', fontSize: 20 }}>{date.toISOString().split('T')[0]}</Text>
                        <Icon name="calendar" size={26} color={colors.dlsYellowSecondary} style={{ right: 13 }} />
                    </View>
                </TouchableOpacity>
            </View>

            <DateTimePickerModal
                date={date}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                /* maximumDate={dateInitial} */
            />
        </>
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