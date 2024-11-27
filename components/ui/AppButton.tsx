import colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { string } from "yup";

interface Props {
  title: string;
  onPress?(): void;
}

const AppButton: FC<Props> = ({ onPress, title }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, defaultStyles.pillButton]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
    backgroundColor: colors.SECONDARY,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  title: {
    color: colors.PRIMARY,
    fontSize: 18,
  },
});

export default AppButton;
