import React, { useState } from 'react'
import { View, Text, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../Themes/DlsTheme';
import { PickerSelect } from './PickerSelect';
import CheckBox from '@react-native-community/checkbox';


export const CreateObservePageOne = () => {

    /*     const [state, setstate] = useState({
            label: 'Unidad de negocio',
            value: null,
        }) */

    const [date, setDate] = useState('--/--/----');

    const deportes = [
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
        { label: 'Basket', value: 'basket' },
    ]

    //datePicker
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        setDate(date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear());
        hideDatePicker();
    };

    //CheckBox
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <View>

            <PickerSelect placeholder="Unidad de negocio" item={deportes} />

            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 20 }}>{date}</Text>
                <TouchableOpacity
                    onPress={showDatePicker}>
                    <Icon name="calendar" size={30} color={colors.dlsYellowSecondary} />
                </TouchableOpacity>
            </View>

            <PickerSelect placeholder="Origen" item={deportes} />

            <PickerSelect placeholder="Turno" item={deportes} />

            <View style={{ flexDirection: 'row' , alignItems: 'center'}}>
            <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
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
