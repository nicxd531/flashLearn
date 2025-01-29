import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import Index from "./Index";
import IntroPage from "./(auth)/IntroPage";
import SignUp from "./(auth)/Signup";
import Login from "./(auth)/Login";
import HomeLayout from "./(tabs)/HomeLayout";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthState,
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from "@/utils/store/auth";
import { ActivityIndicator } from "react-native-paper";
import colors from "@/constants/Colors";
import HomeScreen from "./(tabs)/HomeScreen";
import LostPassword from "./(auth)/LostPassword";
import Verification from "./(auth)/Verification";
import { AuthStackParamList } from "@/@types/navigation";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
import client from "@/components/api/client";
import React, { useEffect, useState } from "react";
import { RootState } from "@/utils/store";

const AuthNavigator = () => {
  const { loggedIn, busy } = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();
  const loader = (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    </View>
  );
  useEffect(() => {
    if (loggedIn) {
      navigation.navigate("HomeLayout");
    } else if (!loggedIn) {
      navigation.navigate("IntroPage");
    }
  });

  useEffect(() => {
    const fetchAuthInfo = async () => {
      dispatch(updateBusyState(true));
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        if (!token) {
          dispatch(updateBusyState(false));
          updateBusyState(false);
          navigation.navigate("IntroPage");
        }
        const { data } = await client.get("/auth/is-auth", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        dispatch(updateProfile(data.profile));
        dispatch(updateLoggedInState(true));
      } catch (e) {
        console.log("Auth error", e);
      }
      dispatch(updateBusyState(false));
    };
    fetchAuthInfo();
  }, []);
  return (
    <>
      {busy && loader}
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{ headerShown: false }}
      >
        {!loggedIn ? (
          <>
            <Stack.Screen name="Index" component={Index} />
            <Stack.Screen name="IntroPage" component={IntroPage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="LostPassword" component={LostPassword} />
            <Stack.Screen name="Verification" component={Verification} />
          </>
        ) : (
          <>
            <Stack.Screen name="HomeLayout" component={HomeLayout} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AuthNavigator;
