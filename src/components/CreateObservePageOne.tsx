import React, { useState } from 'react'
import { View, Text, Dimensions } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../Themes/DlsTheme';
import { PickerSelect } from './PickerSelect';
import CheckBox from '@react-native-community/checkbox';
import { M38GetCompIntfcDLHRTAOBSERVCIResponse, objUseForm } from '../interfaces/prompInterfaces';

interface Props{
    form: objUseForm;
    onChange: (value: string, field: keyof objUseForm) => void;
}

export const CreateObservePageOne = ({form,onChange}:Props) => {

    //datePicker
    const [date, setDate] = useState('--/--/----');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {

        setDate(date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear());
        onChange(date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),'fecha');
        hideDatePicker();
        console.log("form p1: ");
        console.log(form);
    };

    //CheckBox
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <View>

            <PickerSelect placeholder="Unidad de negocio" type="DLHR_EMPL_BUSSINES_UNIT" onChange={onChange} />

            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 20 }}>{date}</Text>
                <TouchableOpacity
                    onPress={showDatePicker}>
                    <Icon name="calendar" size={30} color={colors.dlsYellowSecondary} />
                </TouchableOpacity>
            </View>

            <PickerSelect placeholder="Origen" type="DLHR_ORIGEN" onChange={onChange} />
            <PickerSelect placeholder="Turno" type="DLHR_TURNO" onChange={onChange} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => {
                        setToggleCheckBox(newValue);
                        onChange(newValue ? 'Y': 'N','destacar');
                    }}
                />
                <Text>A destacar</Text>
            </View>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

        </View>
    )
}
