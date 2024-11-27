import { Redirect } from "expo-router";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

interface Props {}

const index: FC<Props> = (props) => {
  return <Redirect href={"/(auth)/SplashScreen"} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default index;
