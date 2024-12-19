import { FC, ReactNode, useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import CircleUi from "../ui/CircleUi";
import colors from "@/constants/Colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface Props {
  children: ReactNode;
  heading?: string;
  subHeading?: string;
}
const { height } = Dimensions.get("window");

const AuthFormContainer: FC<Props> = ({ children, heading, subHeading }) => {
  const translateY = useSharedValue(height); // Start off-screen

  // Animated style that uses the translateY shared value
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  let emoji;
  switch (heading) {
    case "Welcome Back":
      emoji = (
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>{heading}</Text>
          <View style={styles.roundedView}>
            <Text style={styles.emoji}>✋</Text> {/* Hand emoji */}
          </View>
        </View>
      );
      break;
    case "New Account":
      emoji = (
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>{heading}</Text>
          <View style={styles.roundedView}>
            <Text style={styles.emoji}>📷</Text>
          </View>
        </View>
      );
      break;
    case "Forget Password!":
      emoji = (
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>{heading}</Text>
          <View style={styles.roundedView}>
            <Text style={styles.emoji}>😢</Text> {/* Hand emoji */}
          </View>
        </View>
      );
      break;
    default:
      emoji = "";
  }
  useEffect(() => {
    // Animate the view to slide in from the bottom
    translateY.value = withTiming(height * 0.3, { duration: 500 }); // Cover 80% of the screen height
  }, [translateY]);
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {emoji}
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    overflow: "hidden",
    width: "100%",
    height: height * 0.6, // Set height to 80% of the screen
    backgroundColor: "white", // White background
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    elevation: 5, // Add some elevation/shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerContainer: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    color: "black",
    fontSize: 45,
    fontWeight: "bold",
    paddingVertical: 5,
    width: "60%",
  },
  subHeading: { color: colors.CONTRAST, fontSize: 16 },
  image: {
    width: 100,
    height: 100,
  },
  roundedView: {
    width: 75, // Width of the rounded view
    height: 75, // Height of the rounded view
    backgroundColor: "#d3d3d3", // Whitish-grey background color
    borderRadius: 75, // Half of width/height to make it fully rounded
    justifyContent: "center", // Center the emoji vertically
    alignItems: "center", // Center the emoji horizontally
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  emoji: {
    fontSize: 30, // Size of the emoji
  },
  text: {
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
  },
});

export default AuthFormContainer;
