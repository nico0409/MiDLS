import React, { useRef, useState } from "react";
import { Animated, Dimensions, FlatList, View } from "react-native";

import { PanGestureHandler } from "react-native-gesture-handler";

import { CARD_HEIGHT} from "../Transformations/components/Card";
import WalletCard from "./WalletCard";
import { DlhrAllObserve } from '../../interfaces/prompInterfaces';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const useLazyRef = <T extends object>(initializer: () => T) => {
  const ref = useRef<T>();
  if (ref.current === undefined) {
    ref.current = initializer();
  }
  return ref.current;
};
const { height } = Dimensions.get("window");
const MARGIN = 16;
const HEIGHT = CARD_HEIGHT + MARGIN * 2;

interface Props {
  term: string,
  observeFiltered: DlhrAllObserve[],
  allObserveList: DlhrAllObserve[],
  setTerm:React.Dispatch<React.SetStateAction<string>>,
}
const Wallet = ({ term, observeFiltered, allObserveList ,setTerm}: Props) => {
  const y = useLazyRef(() => new Animated.Value(0));
  const onScroll = useLazyRef(() =>
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: { y },
          },
        },
      ],
      { useNativeDriver: true }
    )
  );

  
  return  (allObserveList[0]!==undefined && allObserveList[0].NroTarjeta !== undefined ? 
      <AnimatedFlatList
      
        scrollEventThrottle={16}
        bounces={false}
        {...{ onScroll }}
        data={(term.length !== 0) ? observeFiltered : allObserveList}
        renderItem={({ index ,item}) => (
          <WalletCard {...{ index, y,item,setTerm}} />
        )}
        keyExtractor={(item,index) => index.toString()}
      />
      : <View></View> )
  
  
  
};

export default Wallet;
