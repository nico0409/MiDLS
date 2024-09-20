import React from "react";
import { StyleSheet } from "react-native";

import Animated, { SharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";
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
  rotateChevronValue: SharedValue<number>
}

export default ({rotateChevronValue }: ChevronProps) => {
  
  const rotateChevron = useAnimatedStyle(() => {
    return {
      transform: [{
        rotateZ: withTiming(`${rotateChevronValue.value}rad`, { duration: 200 })
      }],
    };
  });

  return (
    <Animated.View
      style={[styles.container, rotateChevron]}
    >
      <Icon name="chevron-up" color={colors.dlsYellowSecondary} size={24} />
    </Animated.View>
  );
};
