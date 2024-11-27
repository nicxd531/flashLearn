import colors from "@/constants/Colors";
import { FC } from "react";
import { StyleSheet, TextInput, View, TextInputProps } from "react-native";

interface Props extends TextInputProps {}

const AppInput: FC<Props> = (props) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.INACTIVE_CONTRAST}
      style={[styles.input, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    borderRadius: 25,
    color: colors.CONTRAST,
    padding: 10,
  },
});

export default AppInput;
