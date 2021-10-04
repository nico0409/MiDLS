import React from 'react'
import { View } from 'react-native'
import RNSingleSelect, {
    ISingleSelectDataType,
} from "@freakycoder/react-native-single-select";
import { StatusBar, SafeAreaView, Dimensions } from "react-native";

const { width: ScreenWidth } = Dimensions.get("window");

const staticData: Array<ISingleSelectDataType> = [
    {
        id: 0,
        value: "Euismod Justo",
        imageSource: require("../assets/money.png"),
    },
    {
        id: 1,
        value: "Risus Venenatis",
        imageSource: require("../assets/beer.png"),
    },
    {
        id: 2,
        value: "Vestibulum Ullamcorper",
        imageSource: require("../assets/party.png"),
    },
    {
        id: 3,
        value: "Lorem Nibh",
        imageSource: require("../assets/food-and-restaurant.png"),
    },
    {
        id: 4,
        value: "Ligula Amet",
        imageSource: require("../assets/guitar.png"),
    },
];


export const PickerSelect = () => {
    const [dynamicData, setDynamicData] = React.useState<
        Array<ISingleSelectDataType>
    >([]);

    React.useEffect(() => {
        setTimeout(() => {
            setDynamicData(staticData);
        }, 2000);
    });
    return (

        <View
            style={{
                
                //backgroundColor: "#454851",
                 backgroundColor: "#eceef3",
                height:200,
                justifyContent: "center",
            }}>
            <View
                style={{
                    shadowRadius: 12,
                    shadowOpacity: 0.1,
                    shadowColor: "#757575",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                }}
            >
                <RNSingleSelect
                    darkMode
                    data={dynamicData}
                    width={ScreenWidth * 0.9}
                    searchEnabled={false}
                    menuBarContainerWidth={ScreenWidth * 0.9}
                    onSelect={(selectedItem: ISingleSelectDataType) =>
                        console.log("SelectedItem: ", selectedItem)
                    }
                />
                 <RNSingleSelect
                    darkMode
                    data={dynamicData}
                    width={ScreenWidth * 0.9}
                    searchEnabled={false}
                    menuBarContainerWidth={ScreenWidth * 0.9}
                    onSelect={(selectedItem: ISingleSelectDataType) =>
                        console.log("SelectedItem: ", selectedItem)
                    }
                />
            </View>
        </View>
    )
}

/* import React, { useState } from 'react'
import { View, Text, Animated } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface Props {
    placeholder: string;
    item: item[]
    itmeSelect?:number
}

interface item {
    label: string ;
    value: string;
}

export const PickerSelect = ({ placeholder, item }: Props) => {

    const [state, setstate] = useState({
        label: placeholder,
        value: null,
        color: 'blue',
})

const deportes=[
    { label: 'Football', value: 'football' },
    { label: 'Baseball', value: 'baseball' },
    { label: 'Hockey', value: 'hockey' },
]


console.log('test4',state);

return (
    <View style={{}}>
        <RNPickerSelect
        onValueChange={(value) => setstate({...state,value,label:deportes.find(function(element){return element.value===value})?.label!})}
        placeholder={{ label: state.label,
            value: state.value,
            color: 'blue', }}
        items={deportes}

    />
      <Text style={{width: '100%', height: 60, position: 'absolute', bottom: 0, left: 0}}>{' '}</Text>
    </View>
)
}
 */