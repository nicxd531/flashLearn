import React, { FC } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import {
  Avatar,
  Button,
  IconButton,
  MD3Colors,
  Text,
  TouchableRipple,
} from "react-native-paper";
import FeedsBtn from "./FeedsBtn";

const { width } = Dimensions.get("window");

const Feeds: FC<{
  image: string;
  avatar: string;
  name: string;
  info: string;
  time: string;
}> = ({ image, avatar, name, info, time }) => {
  return (
    <View style={{ borderRadius: 50, overflow: "hidden", height: 500 }}>
      <TouchableRipple
        style={styles.feedItem}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <ImageBackground source={{ uri: image }} style={styles.imageBackground}>
          <View style={styles.overlay}>
            <View style={styles.userInfo}>
              <Avatar.Image size={40} source={{ uri: avatar }} />
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{name}</Text>
                <Text style={styles.userTimeText}>{time}</Text>
              </View>
            </View>
            <Text style={styles.userInfoText}>{info}</Text>
          </View>
        </ImageBackground>
      </TouchableRipple>
      <FeedsBtn />
    </View>
  );
};

const styles = StyleSheet.create({
  feedItem: {
    width: width * 0.9, // Adjust width as needed
    height: 500, // Adjust height as needed
    marginVertical: 10,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userDetails: {
    marginLeft: 10,
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  userInfoText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 30,
  },
  userTimeText: {
    color: "#fff",
    fontSize: 14,
  },
  actions: {
    top: 100,
    right: 0,
    flexDirection: "column",
    justifyContent: "space-around",
    position: "absolute",
    backgroundColor: "grey",
    borderRadius: 20,
  },
  actionButton: {
    marginHorizontal: 5,
  },
});

export default Feeds;
