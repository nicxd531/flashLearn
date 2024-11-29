import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FC } from "react";
import { StyleSheet, View } from "react-native";
import LostPassword from "./LostPassword";
import Verification from "./Verification";
import SignUp from "./Signup";
import Login from "./Login";
import IntroPage from "./IntroPage";
import SplashScreen from "./SplashScreen";

interface Props {}

const Layout: FC<Props> = (props) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="IntroPage" component={IntroPage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="LostPassword" component={LostPassword} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Layout;
