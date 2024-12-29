// import { FC } from "react";
// import { StyleSheet, View } from "react-native";
// import { getAuthState } from "@/utils/store/auth";
// import { useSelector } from "react-redux";
// import { NavigationContainer } from "@react-navigation/native";
// import SplashScreen from "./_splash";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LostPassword from "./(auth)/LostPassword";
// import Verification from "./(auth)/Verification";
// import IntroPage from "./(auth)/IntroPage";
// import SignUp from "./(auth)/Signup";
// import Login from "./(auth)/Login";
// import HomeScreen from "./(tabs)/HomeScreen";
// import ProfileScreen from "./(tabs)/ProfileScreen";
// import SearchScreen from "./(tabs)/SearchScreen";
// import index from "./index";
// import AuthLayout from "./(auth)/_layout";

// interface Props {}

// const AuthNavigator: FC<Props> = (props) => {
//   const authState = useSelector(getAuthState);
//   const { loggedIn } = authState;
//   console.log({ authState });
//   const Stack = createNativeStackNavigator();

//   return (
//     <Stack.Navigator
//       initialRouteName="IntroPage"
//       screenOptions={{ headerShown: false }}
//     >
//       {loggedIn ? <AuthLayout /> : <TabLayout />}
//     </Stack.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {},
// });

// export default AuthNavigator;
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Index from "./Index";
import IntroPage from "./(auth)/IntroPage";
import SignUp from "./(auth)/Signup";
import Login from "./(auth)/Login";
import HomeLayout from "./(tabs)/HomeLayout";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getAuthState } from "@/utils/store/auth";
import { ActivityIndicator } from "react-native-paper";
import colors from "@/constants/Colors";
import HomeScreen from "./(tabs)/HomeScreen";

interface Props {}

const AuthNavigator: FC<Props> = () => {
  const { loggedIn, loading } = useSelector(getAuthState);
  const navigation = useNavigation();
  console.log({ loggedIn, loading });

  useEffect(() => {
    if (loading) return;
    if (loggedIn) {
      navigation.navigate("HomeMain");
    } else if (!loggedIn) {
      navigation.navigate("IntroPage");
    }
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  }
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="introPage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="IntroPage" component={IntroPage} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="HomeMain" component={HomeLayout} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AuthNavigator;
