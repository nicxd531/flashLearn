import React, { FC, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";
import HomeLayout from "../(tabs)/HomeLayout";
import IntroPage from "./IntroPage";
import Login from "./Login";

import colors from "@/constants/Colors";
import { getAuthState } from "@/utils/store/auth";
import SignUp from "./Signup";
import LostPassword from "./LostPassword";
import { AuthStackParamList } from "@/@types/navigation";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
import client from "@/components/api/client";

interface Props {
  navigation?: any;
  router?: any;
}

const AuthLayout: FC<Props> = (props) => {
  const Stack = createNativeStackNavigator();
  const { loggedIn, busy } = useSelector(getAuthState);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  useEffect(() => {
    if (busy) return;
    if (loggedIn) {
      navigation.navigate("HomeLayout");
    } else if (!loggedIn) {
      navigation.navigate("IntroPage");
    }
  });

  if (busy) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  }
  useEffect(() => {
    const fetchAuthInfo = async () => {
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        if (!token) return;
        const { data } = await client.get("/auth/is-auth", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log("my auth profile", { data });
      } catch (e) {
        console.log("Auth error", e);
      }
    };
    fetchAuthInfo();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="IntroPage"
        screenOptions={{ headerShown: false }}
      >
        {!loggedIn ? (
          <>
            <Stack.Screen name="IntroPage" component={IntroPage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="LostPassword" component={LostPassword} />
          </>
        ) : (
          <>
            <Stack.Screen name="HomeLayout" component={HomeLayout} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthLayout;
