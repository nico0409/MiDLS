import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { colors } from '../Themes/DlsTheme';
import { objUseForm, promptType, DlhrAllObserve } from '../interfaces/prompInterfaces';
import { AuthContext } from '../context/formContext/AuthContext';
import { Asingstorage } from './Storage';

interface Props {
    field1: string;
    field2?: string;
    closePrompt: React.Dispatch<React.SetStateAction<boolean>>;
    onChange?: (value: string, field: keyof objUseForm) => void;
    setplaceHolder: React.Dispatch<React.SetStateAction<string>>;
    fieldtype: keyof objUseForm;
    setemplid?: React.Dispatch<React.SetStateAction<{
        fieldValue1: string;
        fieldValue2: string;
    }>>;
    promptType: promptType;
    setCardDescr?: React.Dispatch<React.SetStateAction<DlhrAllObserve>>;
    cardDescr?: DlhrAllObserve;
    setIsItemChanged?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FlatListItemPrompt = ({ setemplid,
    promptType,
    fieldtype,
    setplaceHolder,
    field1, field2,
    closePrompt,
    onChange,
    setCardDescr,
    cardDescr,
    setIsItemChanged
}: Props) => {

    const { setEmplidSelect } = useContext(AuthContext)



    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
                (setIsItemChanged !== undefined ? setIsItemChanged(true) : {});

                setplaceHolder((promptType.type === 'DLHR_APS') ? field1 : field2!);

                closePrompt(false);

                promptType.type === 'DLHR_EQUIP_TBL' &&
                    setCardDescr !== undefined &&
                    setCardDescr({ ...cardDescr, ...{ IDEquipo: field1, ID_EQUIPO_DESCR: field2, } });

                (setemplid !== undefined ?
                    setemplid({ fieldValue1: field1, fieldValue2: field2! }) : {});


                promptType.type === 'DLHR_EMPL_BUSSINES_UNIT' && setEmplidSelect({ fieldValue1: field1, fieldValue2: field2! });
                promptType.type === 'DLHR_EMPL_BUSSINES_UNIT' && Asingstorage({ StorageType: 'emplid' }, { emplid: field1, name: field2 });
                closePrompt(false);
                (onChange !== undefined && onChange(field1, fieldtype));
            /*    promptType.type === 'DLHR_APS' && onChange!(field2!, "m38:DL_RESPSEGAPS"); */
                
            }}
        >
            <View style={styles.container}>
                <View>
                    <Text style={{...styles.itemText,marginLeft:15}}>
                        {field1}
                    </Text>
                </View>
                {(promptType.type !== 'DLHR_APS') &&
                    <View style={{ width: '65%' }}>
                        <Text style={styles.itemText}>
                            {field2}
                        </Text>
                    </View>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        width: '100%'
    },
    itemText: {
        fontSize: 20,
        fontFamily: 'StagSans-Light',
        color: colors.dlsTextwhite,
        /* fontStyle: 'italic',*/
    },
});