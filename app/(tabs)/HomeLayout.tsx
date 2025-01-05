import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "@/constants/Colors";
import { GestureResponderEvent } from "react-native";
import TopAppBar from "@/components/ui/home/TopAppBar";
import TopCreators from "@/components/ui/home/TopCreators";

import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SearchScreen from "./SearchScreen";
import HomeScreen from "./HomeScreen";
import CreateScreen from "./CreateScreen";
import ProfileScreen from "./ProfileScreen";
import PlaylistScreen from "./PlaylistScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

const CustomTabBarButton: React.FC<{
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}> = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
      borderRadius: 30,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.PRIMARY,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export default function HomeLayout() {
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={styles.container}>
      {/* AppBar stays fixed at the top */}
      {/* <TopAppBar /> */}

      {/* Fixed Tab.Navigator */}
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#e91e63",
          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            backgroundColor: "#ffffff",
            borderRadius: 15,
            height: 70,
            padding: 20,
            ...styles.shadow,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => (
              <Entypo
                style={{ color: focused ? colors.PRIMARY : "#748c94" }}
                name="home"
                size={25}
                color="black"
              />
            ),
          }}
        />
        <Tab.Screen
          name="search"
          component={SearchScreen}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ focused }) => (
              <Feather
                style={{ color: focused ? colors.PRIMARY : "#748c94" }}
                name="search"
                size={25}
                color="black"
              />
            ),
          }}
        />
        <Tab.Screen
          name="create"
          component={CreateScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                style={{ color: "#fff" }}
                name="plus"
                size={25}
                color="black"
              />
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Library"
          component={PlaylistScreen}
          options={{
            tabBarLabel: "Library",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                style={{ color: focused ? colors.PRIMARY : "#748c94" }}
                name="library-outline"
                size={25}
                color="black"
              />
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                style={{ color: focused ? colors.PRIMARY : "#748c94" }}
                name="account"
                size={25}
                color="black"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
