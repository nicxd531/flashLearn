import { Stack } from "expo-router";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

interface Props {}

const Layout: FC<Props> = (props) => {
  return (
    <Stack initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="IntroPage"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="Login"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="Signup"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="Verification"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="LostPassword"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Layout;
