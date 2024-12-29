import { FC } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

interface Props {}

const Loader: FC<Props> = (props) => {
  return <Animated.View style={styles.container}></Animated.View>;
};

const styles = StyleSheet.create({
  container: {},
});

export default Loader;
