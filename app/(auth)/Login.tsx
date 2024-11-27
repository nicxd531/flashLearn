import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {}

const Login: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
});

export default Login;
