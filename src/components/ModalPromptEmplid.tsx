import React,{useState,useEffect} from 'react'
import { FlatList, Modal, Platform, TouchableOpacity, View, StyleSheet, useWindowDimensions, Dimensions } from 'react-native';
import { objUseForm, promptField } from '../interfaces/prompInterfaces';
import { colors} from '../Themes/DlsTheme';
import { FlatListItemPrompt } from './FlatlisItemPrompt';
import { GetPromptArray } from './GetPromptArrayy';
import { SearchInput } from './SearchInput';


interface Props {
    setstatePropmpEmp:React.Dispatch<React.SetStateAction<boolean>>
    statePropmpEmp:boolean
    setemplid?: React.Dispatch<React.SetStateAction<{
        fieldValue1: string;
        fieldValue2: string;
    }>>
}


const { width,height} = Dimensions.get("window");
export const ModalPromptEmplid = ({setemplid,setstatePropmpEmp,statePropmpEmp}:Props) => {



    const [term, setTerm] = useState('')

    const [observeFiltered, setObserveFiltred] = useState<any[]>([])

    const { PromptObArray } = GetPromptArray({type:'DLHR_EMPL_BUSSINES_UNIT'})

    const [seeFlatList, setSeeFlatList] = useState(true);

    let strPLaceHolder = 'Emplid'   

     
     const [placeHolder, setplaceHolder] = useState(strPLaceHolder)

  
  
    let strField1 = 'EMPLID' ;
    let strField2 = 'NOMBRE';
    let placeHolderSrch = 'Empleado';
    let fieldType: keyof objUseForm = 'm38:BUSINESS_UNIT'


   
           
    let data: any[] = [];
        data = PromptObArray.map(item => { return item.DLHR_OBSERVE_EMPLID });
             


    useEffect(() => {
        if (term.length === 0) {

            setSeeFlatList(true)
            return setObserveFiltred(data)

        }
        setObserveFiltred(
                    data.filter(
                        observe => observe[strField1].toLocaleLowerCase()
                            .includes(term.toLocaleLowerCase())
                    )
                )
           
          setSeeFlatList(true);
    }, [term])

    
    return (
        <Modal animationType='fade'
        visible={statePropmpEmp}
        transparent
        onRequestClose={() => {

            setstatePropmpEmp(!statePropmpEmp)

        }}
    >
        <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', }}
            activeOpacity={1}
            onPressOut={() => { setstatePropmpEmp(false) }}
        >
        </TouchableOpacity>

        <View style={{
            ...styles.conteinerModal,
            top: height * 0.15,
            left: width * 0.1,
            height: height * 0.5,
            width: width * 0.8,

        }}>
            <View style={{
                ...styles.cardPrompt,
                height: height * 0.5,
                width: width * 0.8,
                backgroundColor: colors.dlsGrayPrimary
            }}>

                <SearchInput
                    onDebounce={(value) => { setTerm(value) }}
                    placeholder={placeHolderSrch}
                    style={{
                        ...styles.SearchInput,
                        width: width - 40,
                        top: 10
                    }}
                    onSeeFlatList={setSeeFlatList}
                />

                <View style={{
                    top: 25,
                    height: height * 0.4,

                    backgroundColor: colors.dlsGrayPrimary
                }}>


                    {seeFlatList &&
                        <FlatList
                            data={term.length === 0 ? data : observeFiltered}
                            renderItem={({ item }) =>
                                <FlatListItemPrompt
                                    setplaceHolder={setplaceHolder}
                                    field1={item[strField1]}
                                    field2={item[strField2]}
                                    closePrompt={setstatePropmpEmp}
                                    fieldtype={fieldType}
                                    setemplid={setemplid}
                                    promptType={{type:'DLHR_EMPL_BUSSINES_UNIT'}}
                                />
                            }
                            keyExtractor={(item, index) => item[strField1]+ index.toString() }
                            showsVerticalScrollIndicator={false}
                        /* refreshing={seeFlatList} */
                        />}

                </View>
            </View>

        </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
    conteinerModal: {
        position: 'absolute',
        zIndex: 999,
        flex: 1,
    },
    cardPrompt: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 10
        },
        elevation: 10,
        borderRadius: 15,
        shadowOpacity: 0.25

    },
    SearchInput: {
        position: 'absolute',
        zIndex: 998,

    },
    btnContainer: {
        height: 50,
        width: width * 0.87,

        borderRadius: 15,
        backgroundColor: '#2b2c32',
        justifyContent: 'space-between',
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',



        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 15
    },

    textBtn: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'

    }
})