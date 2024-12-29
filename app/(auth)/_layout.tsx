import React, { FC, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";
import HomeLayout from "../(tabs)/HomeLayout";
import IntroPage from "./IntroPage";
import Login from "./Login";

import colors from "@/constants/Colors";
import { getAuthState } from "@/utils/store/auth";
import SignUp from "./Signup";

interface Props {
  navigation?: any;
  router?: any;
}

const AuthLayout: FC<Props> = (props) => {
  const Stack = createNativeStackNavigator();
  const { loggedIn, loading } = useSelector(getAuthState);
  const navigation = useNavigation();

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
