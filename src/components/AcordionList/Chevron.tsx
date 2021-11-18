import React from "react";
import { StyleSheet, processColor } from "react-native";

import Animated from "react-native-reanimated";
import { mix } from "react-native-redash/src/v1";
import  Icon  from "react-native-vector-icons/Ionicons";
import { mixColor } from "../../libs/react-native-redash/src/v1";
import { colors } from "../../Themes/DlsTheme";

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
    processColor(colors.dlsBtonColosWhite)!,
    processColor(colors.dlsBluePrimary)!
  ) as any
  return (
    <Animated.View
      style={[styles.container,  { transform: [{ rotateZ }], backgroundColor }  ]}
    >
      <Icon name="chevron-up" color="black" size={24} />
    </Animated.View>
  );
};
