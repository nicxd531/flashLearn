import colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { FC } from "react";
import { useNavigation } from "@react-navigation/native";
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

interface Props {
  navigation: any;
}

const IntroPage: FC<Props> = ({ navigation }) => {
  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="light-content" hidden={true} translucent={true} />
      <Image
        style={styles.image}
        source={require("../../assets/images/IntroPage.jpg")}
      />
      <View style={styles.overlay} />
      <View style={styles.halfScreen}>
        <View style={{ marginTop: 80, padding: 20, alignItems: "center" }}>
          <Text style={[styles.header, { width: "95%" }, tw`font-bold`]}>
            Welcome to FlashLearn 📚
          </Text>
          <Text style={styles.subHeading}>
            Your personalized learning companion!
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Link
            href={"/Login"}
            style={[
              defaultStyles.pillButton,
              { flex: 1, backgroundColor: colors.PRIMARY, marginBottom: 10 },
            ]}
            asChild
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Login")}
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
          </Link>
          <Link
            href={"/Signup"}
            style={[
              defaultStyles.pillButton,
              { flex: 1, backgroundColor: "#fff", height: 60 },
            ]}
            asChild
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={{ fontSize: 22, fontWeight: "500" }}>Sign up</Text>
            </TouchableOpacity>
          </Link>
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
    fontSize: 35,
    color: "#fff",
  },
  buttonsContainer: {
    padding: 12,
    width: "100%",
    height: 150,
    justifyContent: "space-between",
  },
  subHeading: {
    fontSize: 20,
    color: "#fff",
  },
  button: {},
});

export default IntroPage;
