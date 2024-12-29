import colors from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";

interface Props {}

const Index: FC<Props> = (props) => {
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate loading or initialization logic
    const timeout = setTimeout(() => {
      navigation.navigate("IntroPage"); // Navigate to the main screen or auth flow
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={true} translucent={true} />
      <Image
        style={[styles.image]}
        source={require("../assets/images/IntroPage.jpg")}
      />
      <View style={styles.iconContainer}>
        <Image
          style={{ width: 150, height: 150 }}
          source={require("../assets/images/appicon.png")}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  subText: {
    fontSize: 18,
    color: "#333",
    marginTop: 10,
  },
});

export default Index;
