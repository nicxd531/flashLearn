import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {}

const DiscoverScreen: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>Discover Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DiscoverScreen;
