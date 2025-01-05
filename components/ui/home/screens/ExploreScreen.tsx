import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Advert from "./Advert";
import Favorite from "../Favorites";
import RecentlyPlayed from "../RecentlyPlayed";
import Favorites from "../Favorites";
import Categories from "../Categories";

interface Props {}

const ExploreScreen: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Advert />
      <RecentlyPlayed />
      <Favorites />
      <Categories />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
});

export default ExploreScreen;
