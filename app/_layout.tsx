import store from "@/utils/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Provider } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import AppContainer from "@/components/AppContainer";

const Layout: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppContainer>
          <AuthNavigator />
        </AppContainer>
      </NavigationContainer>
    </Provider>
  );
};

export default Layout;
