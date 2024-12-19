import { FC, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import AppLink from "@/components/ui/AppLink";
import AuthFormContainer from "@/components/form/AuthFormContainer";
import OtpField from "@/components/ui/OtpField";
import AppButton from "@/components/ui/AppButton";
import tw from "twrnc";
import client from "@/components/api/client";

interface Props {
  route: any;
  navigation: any;
}

const otpFields = new Array(6).fill("");
const Verification: FC<Props> = ({ route, navigation }) => {
  const { userInfo } = route.params;
  console.log(userInfo);
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
  const isValidOtp = otp.every((value) => {
    return value.trim();
  });
  const handleSubmit = () => {
    if (!isValidOtp) return;
    try {
      const { data } = client.post("/auth/verify-email", {
        userId: userInfo.id,
        token: otp.join(""),
      });
      console.log(data);
    } catch (err) {
      console.log("error inside verification", err);
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);
  return (
    <KeyboardAvoidingView style={{ flex: 1, height: "100%" }}>
      <Image
        style={styles.image}
        source={require("../../assets/images/IntroPage.jpg")}
      />
      <View style={styles.overlay} />
      <View style={{ height: "100%" }}>
        <AuthFormContainer heading="">
          <View style={tw`w-100 text-center items-center justify-center`}>
            <Image
              style={styles.png}
              source={require("../../assets/images/otpPng.png")}
            />
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={tw`font-bold text-4xl`}> Verification</Text>
              <Text style={tw` text-2xl`}> check your registered email</Text>
            </View>
          </View>
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
          <View style={tw`mt-25`}></View>
          <AppButton title="Submit" />
          <View style={styles.linkContainer}>
            <AppLink title="Re-send OTP" />
          </View>
        </AuthFormContainer>
      </View>
    </KeyboardAvoidingView>
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
  linkContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "flex-end",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    right: 0,
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
  },
  png: {
    width: 200,
    height: 200,
  },
});

export default Verification;
