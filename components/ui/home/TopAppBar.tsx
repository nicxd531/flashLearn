import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as React from "react";
import { Appbar } from "react-native-paper";

const TopAppBar = () => (
  <Appbar.Header elevated={false} theme={{ colors: { primary: "green" } }}>
    <Appbar.Content
      title="Flashlearn"
      titleStyle={{ fontWeight: "bold", fontSize: 24 }} // Make the title bold and bigger
    />
    <Appbar.Action
      icon={({ color, size }) => (
        <Ionicons name="paper-plane-outline" size={25} color="black" />
      )}
      onPress={() => console.log("Face pressed")}
    />
    <Appbar.Action
      icon={(props) => (
        <Ionicons name="notifications-outline" size={25} color="black" />
      )}
      onPress={() => console.log("Face pressed")}
    />
  </Appbar.Header>
);

export default TopAppBar;
