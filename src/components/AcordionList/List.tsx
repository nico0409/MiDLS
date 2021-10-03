import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

import Animated, { Value } from "react-native-reanimated";
import { mix, useTransition } from "react-native-redash/src/v1/";
                                      
import Chevron from "./Chevron";
import Item, { LIST_ITEM_HEIGHT, ListItem } from "./ListItem";
import { withTransition, onGestureEvent } from 'react-native-redash/src/v1';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

import { set,eq ,cond,not ,useCode  } from 'react-native-reanimated';

const { interpolateNode} = Animated;
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  items: {
    overflow: "hidden",
  },
});

export interface List {
  name: string;
  items: ListItem[];
}

interface ListProps {
  list: List;
}

export default ({ list }: ListProps) => {
  const open = new Value <0|1>(0)
  const transition = withTransition (open);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({state});
  const height = mix(transition, 0, LIST_ITEM_HEIGHT * list.items.length);
   const bottomRadius = interpolateNode(transition,{
    inputRange: [0, 16 / 400],
    outputRange: [8, 0]},
  ); 
  useCode(()=>cond(eq(state,State.END),set(open,not(open))) ,[
    open,
    state
  ]);
  return (
    <>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            styles.container,
            {
             borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius, 
            },
          ]}
        >
          <Text style={styles.title}>Total Points</Text>
          <Chevron {...{ transition }} />
        </Animated.View>
      </TapGestureHandler>
      <Animated.View style={[styles.items, { height }]}>
        {list.items.map((item, key) => (
          <Item
            key={key}
            isLast={key === list.items.length - 1}
            {...{ item }}
          />
        ))}
      </Animated.View>
    </>
  );
};
