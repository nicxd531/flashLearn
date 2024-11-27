import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {}

const Signup: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>Sign up</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Signup;
