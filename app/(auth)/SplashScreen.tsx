import colors from "@/constants/Colors";
import { Redirect } from "expo-router";
import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {}

const index: FC<Props> = (props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  if (!loading) return <Redirect href={"/IntroPage"} />;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={true} translucent={true} />
      <Image
        style={[styles.image]}
        source={require("../../assets/images/auth-page.jpg")}
      />
      <View style={styles.iconContainer}>
        <Image
          style={{ width: 150, height: 150 }}
          source={require("../../assets/images/appicon.png")}
        />
        <View>
          <Text style={styles.subText}>Welcome to FlashLearn</Text>
          <ActivityIndicator size="large" color={colors.PRIMARY} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Full height of the screen
    marginBottom: 0, // Remove bottom margin
    paddingBottom: 0, // Remove bottom padding
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    position: "relative",
  },
  image: {
    position: "absolute", // Equivalent to 'absolute' in Tailwind
    top: 0, // Equivalent to 'inset-0'
    right: 0, // Equivalent to 'inset-0'
    bottom: 0, // Equivalent to 'inset-0'
    left: 0, // Equivalent to 'inset-0'
    width: "100%", // Equivalent to 'w-full'
    height: "100%", // Equivalent to 'h-full'
    resizeMode: "cover", // Equivalent to 'object-cover'
  },
  iconContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 40,
  },
  subText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
});

export default index;
