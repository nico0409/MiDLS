import React, {useContext} from 'react'
import { View, Button } from 'react-native';
import { colors } from '../Themes/DlsTheme';
import { AuthContext } from '../context/formContext/AuthContext';
import { NewObservCard } from './NewObservCard';

export const CreateObserveFinalPage = () => {

    const { form } = useContext(AuthContext);

    console.log(form);
    
    const buttonTemp = () =>{
        NewObservCard(form);
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.dlsGrayPrimary }}>
            <Button title="enviar carta" onPress={buttonTemp}/>
        </View>
    )
}
