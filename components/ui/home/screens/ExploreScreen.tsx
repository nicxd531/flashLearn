import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import Advert from "./Advert";
import Favorite from "../Favourites";

interface Props {}

const ExploreScreen: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Advert />
      <Favorite />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
});

export default ExploreScreen;
