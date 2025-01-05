import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface ToasterProps {
  message: string;
  type: "success" | "info" | "error";
  translateY: number;
  onHide: () => void; // Callback to hide the toaster
}

const Toaster: React.FC<ToasterProps> = ({
  message,
  type,
  translateY,
  onHide,
}) => {
  const translateYValue = useSharedValue(-100); // Start off-screen
  useEffect(() => {
    // Animate the toast to slide in from the top
    translateYValue.value = withTiming(translateY, { duration: 500 });

    // Set a timer to hide the toast after 3 seconds
    const timer = setTimeout(() => {
      translateYValue.value = withTiming(-100, { duration: 500 }); // Slide out
      setTimeout(onHide, 500); // Call onHide after the slide-out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [translateY, translateYValue, onHide]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateYValue.value }],
    };
  });

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "rgba(0, 128, 0, 0.7)"; // Light transparent green
      case "info":
        return "rgba(0, 0, 255, 0.2)"; // Light transparent blue
      case "error":
        return "rgba(255, 0, 0, 0.2)"; // Light transparent red
      default:
        return "rgba(128, 128, 128, 0.5)"; // Light transparent gray
    }
  };

  const getIconName = ():
    | "check-circle-outline"
    | "info-outline"
    | "error-outline" => {
    switch (type) {
      case "success":
        return "check-circle-outline";
      case "info":
        return "info-outline";
      case "error":
        return "error-outline";
      default:
        return "info-outline";
    }
  };

  const getTextColor = () => {
    return "white";
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        animatedStyle,
      ]}
    >
      <MaterialCommunityIcons
        name={getIconName()}
        size={24}
        color={getTextColor()}
      />
      <Text style={[styles.message, { color: getTextColor() }]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 50,
    margin: 10,
    position: "absolute",
    top: 0,
    left: "25%",
    right: "100%",
    zIndex: 1000,
    width: "70%",
  },
  message: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default Toaster;
