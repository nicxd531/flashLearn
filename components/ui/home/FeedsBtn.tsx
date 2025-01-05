import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";

interface Props {}

const FeedsBtn: FC<Props> = (props) => {
  return (
    <View style={styles.actions}>
      <TouchableOpacity
        style={{
          backgroundColor: "grey",
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          width: 60,
          height: 60,
        }}
      >
        <IconButton
          icon={() => <Ionicons name="heart-outline" size={20} color="#fff" />}
          iconColor={MD3Colors.error50}
          size={20}
          onPress={() => console.log("Pressed")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "grey",
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          width: 60,
          height: 60,
        }}
      >
        <IconButton
          icon={() => (
            <Ionicons name="chatbubble-ellipses" size={20} color="#fff" />
          )}
          iconColor={MD3Colors.error50}
          size={20}
          onPress={() => console.log("Pressed")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "grey",
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          width: 60,
          height: 60,
        }}
      >
        <IconButton
          icon={() => (
            <Ionicons name="library-outline" size={20} color="#fff" />
          )}
          iconColor={MD3Colors.error50}
          size={20}
          onPress={() => console.log("Pressed")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "grey",
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          width: 60,
          height: 60,
        }}
      >
        <IconButton
          icon={() => (
            <MaterialIcons name="playlist-add" size={20} color="#fff" />
          )}
          iconColor={MD3Colors.error50}
          size={20}
          onPress={() => console.log("Pressed")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  actions: {
    top: 100,
    right: 0,
    flexDirection: "column",
    justifyContent: "space-around",
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
});

export default FeedsBtn;
