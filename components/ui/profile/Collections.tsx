import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {}

const Collections: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>collections page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Collections;
