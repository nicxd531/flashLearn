import { FC, useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import AppLink from "@/components/ui/AppLink";
import AuthFormContainer from "@/components/form/AuthFormContainer";
import OtpField from "@/components/ui/OtpField";
import AppButton from "@/components/ui/AppButton";

interface Props {}

const otpFields = new Array(6).fill("");
const Verification: FC<Props> = (props) => {
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef<TextInput>(null);
  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    if (value === "Backspace") {
      if (!newOtp[index]) setActiveOtpIndex(index - 1);
      newOtp[index] = "";
    } else {
      setActiveOtpIndex(index + 1);
      newOtp[index] = value;
    }
    setOtp([...newOtp]);
  };
  const handlePaste = (value: string) => {
    if (value.length === 6) {
      Keyboard.dismiss();
      const newOtp = value.split("");
      setOtp({ ...newOtp });
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);
  return (
    <AuthFormContainer heading="Forget Password!" subHeading="check your email">
      <View style={styles.inputContainer}>
        {otpFields.map((_, index) => {
          return (
            <OtpField
              ref={activeOtpIndex === index ? inputRef : null}
              placeholder="*"
              key={index}
              onKeyPress={({ nativeEvent }) => {
                handleChange(nativeEvent.key, index);
              }}
              onChangeText={handlePaste}
              keyboardType="numeric"
              value={otp[index] || ""}
            />
          );
        })}
      </View>
      <AppButton title="Submit" />
      <View style={styles.linkConainer}>
        <AppLink title="Re-send OTP" />
      </View>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  linkConainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "flex-end",
  },
});

export default Verification;
