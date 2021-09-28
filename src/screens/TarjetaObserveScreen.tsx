import React,{useState} from 'react'
import { Text, View, Dimensions, SafeAreaView, Platform, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SearchInput } from '../components/SearchInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ObserveCard } from '../components/ObserveCard';
import { styles } from '../Themes/DlsTheme';
import { GetStorage } from '../components/Storage';
import { PromptObserve, StorageTypes } from '../interfaces/prompInterfaces';



export const TarjetaObserveScreen = () => {
   
    const ScreenWidt = Dimensions.get('window').width;
    const { top } = useSafeAreaInsets();
    const [visibleSearch, setVisibleSearch] = useState(false)
    const [term, setTerm] = useState('')

    let respuesta :PromptObserve={}
    const get:StorageTypes={StorageType:'allObserve'};
   
    const  datos= GetStorage( get)
    
  const  data= datos.then(allobserve=>allobserve?.['soapenv:Envelope']['soapenv:Body'].DLHR_ALL_OBSERVE_COLL.DLHR_ALL_OBSERVE)


   
    return (
        <SafeAreaView>
            {visibleSearch &&
                <View style={{
                    flex: 1,

                    marginHorizontal: 20

                }}>
                    <SearchInput
                        onDebounce={(value) => setTerm(value)}
                        style={{
                            position: 'absolute',
                            zIndex: 999,
                            width: ScreenWidt - 40,
                            top: (Platform.OS === 'ios') ? top : top + 20


                        }}
                    />
                </View>
            }



            <View>
               {/*  <Image
                    source={require('../assets/pokebola.png')}
                    style={styles.pokebolaBG}
                /> */}
                <View style={{ alignItems: 'center' }}>
                    <FlatList

                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        data={  Array.isArray(data)?data:[]}
                        keyExtractor={(pokemon) => pokemon.id}
                        renderItem={({ item }) => <ObserveCard observe={item} setVisibleSearch={setVisibleSearch} setTerm={setTerm} />
                        }
                        //infinitescroll
                        //onEndReached={loadPokemons}
                        onEndReachedThreshold={0.4}
                        ListHeaderComponent={(visibleSearch === false && term.length === 0 ? <Text style={{
                            ...styles.globalMargin,
                            ...styles.title,
                            top: top + 20,
                            marginBottom: top + 20,
                            paddingBottom: 10
                        }}>Pokedex</Text> : <View style={{
                            ...styles.globalMargin,
                            ...styles.title,
                            top: top + 20,
                            marginBottom: top + 60,
                            paddingBottom: 10
                        }}><Text>{term}</Text></View>)}
                       /*  ListFooterComponent={(visibleSearch === false ? <ActivityIndicator
                            style={{
                                height: 100,

                            }}
                            size={30}
                            color='green'
                        /> : <></>)} */

                    />
                </View>
                {!visibleSearch &&
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={{ zIndex: 999, ...styles.pokebolaContainer }}
                        onPress={() => setVisibleSearch(true)}
                    >

                        <View >


                          {/*   <Image
                                source={require('../assets/pngegg.png')}
                                style={styles.pokebolaIcon}
                            /> */}

                        </View>
                    </TouchableOpacity>
                }

            </View>
        </SafeAreaView>

    )


}
