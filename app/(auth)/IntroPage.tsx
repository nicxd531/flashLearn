import colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { FC } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { AuthStackParamList } from "@/@types/navigation";

interface Props {
  navigation: any;
}

const IntroPage: FC<Props> = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };
  const inputTransformValue = useSharedValue(0);
  const inputStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: inputTransformValue.value }],
    };
  });
  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="light-content" hidden={true} translucent={true} />
      <Image
        style={styles.image}
        source={require("../../assets/images/IntroPage.jpg")}
      />
      <View style={styles.pngCover}>
        <Image
          style={{ width: 400, height: 400 }}
          source={require("../../assets/images/intropng.png")}
        />
      </View>
      {/* <View style={styles.overlay} /> */}
      <View style={styles.halfScreen}>
        <View
          style={{
            marginTop: 80,
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text style={[styles.header, { width: "75%" }, tw`font-bold`]}>
            Welcome to FlashLearn 📚
          </Text>
          <Text style={styles.subHeading}>
            Your personalized learning companion!
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Animated.View
            entering={FadeInDown.delay(500).duration(1500).springify()}
            style={[
              inputStyle,
              defaultStyles.pillButton,
              { flex: 1, backgroundColor: colors.PRIMARY, marginBottom: 10 },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={navigateToLogin}
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  fontWeight: "500",
                }}
              >
                Log in
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(500).duration(1500).springify()}
            style={[
              inputStyle,
              defaultStyles.pillButton,
              { flex: 1, backgroundColor: "#fff", height: 60 },
            ]}
          >
            <TouchableOpacity activeOpacity={0.8} onPress={navigateToSignUp}>
              <Text style={{ fontSize: 22, fontWeight: "500" }}>Sign up</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  halfScreen: {
    position: "absolute",
    top: Dimensions.get("window").height / 2, // Starts from half the screen
    width: "100%", // Full width of the screen
    alignItems: "center", // Center content horizontally
    paddingVertical: 20, // Add some padding vertically
  },
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    right: 0,
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
  },
  header: {
    fontSize: 30,
    color: "#fff",
  },
  buttonsContainer: {
    padding: 12,
    width: "80%",
    height: 150,
    justifyContent: "space-between",
  },
  subHeading: {
    fontSize: 20,
    color: "#fff",
  },
  button: {},
  pngCover: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
    marginTop: 50,
  },
});

export default IntroPage;
