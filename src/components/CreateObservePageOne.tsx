import React, { useContext, useState } from 'react'
import { View, Text, Dimensions, ScrollView, StyleSheet, } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../Themes/DlsTheme';
import { PickerSelect } from './PickerSelect';
import CheckBox from '@react-native-community/checkbox';
import { objUseForm } from '../interfaces/prompInterfaces';
import { Prompt } from './Prompt';
import { AuthContext } from '../context/formContext/AuthContext';


interface Props {
    form: objUseForm;
    onChange: (value: string, field: keyof objUseForm) => void;
}

export const CreateObservePageOne = ({ form, onChange }: Props) => {
   
    //datePicker
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const {emplidSelect} = useContext(AuthContext)
   
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        hideDatePicker();
        setDate(date.toISOString().split('T')[0]);
        onChange(date.toISOString().split('T')[0], 'm38:DL_IDENTIF_DT');
    };

    
    

    //CheckBox
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const {setCardDescr,cardDescr} = useContext(AuthContext);

    return (
        <ScrollView>

            <View style={{ alignItems: 'center' }}>

                <PickerSelect placeholder="Unidad de negocio" type="DLHR_EMPL_BUSSINES_UNIT" onChange={onChange} setCardDescr={setCardDescr} cardDescr={cardDescr} emplid={emplidSelect} />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>{date}</Text>
                    <TouchableOpacity
                        onPress={showDatePicker}>
                        <Icon name="calendar" size={30} color={colors.dlsYellowSecondary} />
                    </TouchableOpacity>
                </View>

                <PickerSelect placeholder="Origen" type="DLHR_ORIGEN" onChange={onChange} />

                <Prompt onChange={onChange} promptType={{ type: 'DLHR_EQUIP_TBL' } } setCardDescr={setCardDescr} cardDescr={cardDescr} />

                <PickerSelect placeholder="Turno" type="DLHR_TURNO" onChange={onChange} setCardDescr={setCardDescr} cardDescr={cardDescr}  />

                <Prompt onChange={onChange} promptType={{ type: 'DLHR_CUSTOMER' }} />

                <Prompt onChange={onChange} promptType={{ type: 'DLHR_SECTOR' }} />

                <View style={[{ flexDirection: 'row', alignItems: 'center' }]
                }>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => {
                            setToggleCheckBox(newValue);
                            onChange(newValue ? 'Y' : 'N', 'm38:DL_ADESTACAR');
                        }}
                    />
                    <Text>A destacar</Text>
                </View>

                <DateTimePickerModal
                    date={new Date(date)}
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    marginField: {
        marginVertical: 12
    }
});