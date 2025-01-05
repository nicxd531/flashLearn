import colors from "@/constants/Colors";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
interface props {
  setState: (state: boolean) => void;
  btn2: string;
  btn1: string;
  state: boolean;
}
const MiniNav: React.FC<props> = (props) => {
  const [animate] = useState(new Animated.Value(0));
  const [direction, setDirection] = useState<"left" | "right">("left");
  const { setState, btn1, btn2, state } = props;
  const handleClick = (dir: "left" | "right") => {
    setDirection(dir);
    setState(!state);
    Animated.timing(animate, {
      toValue: dir === "left" ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const barPosition = animate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "50%"],
  });

  return (
    <View style={styles.navContainer}>
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleClick("left")}
        >
          <Text>{btn1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleClick("right")}
        >
          <Text>{btn2}</Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.animatedBar, { left: barPosition }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    alignItems: "center",
    width: "44%",
    position: "relative",
    marginHorizontal: "auto",
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  navButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  animatedBar: {
    position: "absolute",
    bottom: 0,
    height: 4,
    width: "50%",
    backgroundColor: colors.PRIMARY,
    borderRadius: 50,
  },
});

export default MiniNav;
