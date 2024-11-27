import colors from "@/constants/Colors";
import { FC, forwardRef } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {}

const OtpField = forwardRef<TextInput, Props>((props, ref) => {
  return (
    <TextInput
      {...props}
      ref={ref}
      style={[styles.input, props.style]}
      placeholderTextColor={colors.INACTIVE_CONTRAST}
    />
  );
});

const styles = StyleSheet.create({
  container: {},
  input: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: colors.SECONDARY,
    borderWidth: 2,
    textAlign: "center",
    color: colors.CONTRAST,
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 0,
  },
});

export default OtpField;
