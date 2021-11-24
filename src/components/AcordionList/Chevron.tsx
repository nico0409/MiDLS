import React from "react";
import { StyleSheet, processColor } from "react-native";

import Animated from "react-native-reanimated";
import { mix, mixColor } from "react-native-redash/src/v1";
import  Icon  from "react-native-vector-icons/Ionicons";

const size = 30;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface ChevronProps {
  transition: Animated.Node<number>;
}

export default ({ transition }: ChevronProps) => {
  const rotateZ = mix(transition, Math.PI, 0) as any;
  const backgroundColor = mixColor(
    transition,
    processColor("#525251")!,
    processColor("#e45645")!
  ) as any
  return (
    <Animated.View
      style={[styles.container,  { transform: [{ rotateZ }], backgroundColor }  ]}
    >
      <Icon name="chevron-down" color="black" size={24} />
    </Animated.View>
  );
};
