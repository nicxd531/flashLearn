import { FC, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AppLink from "@/components/ui/AppLink";
import AuthFormContainer from "@/components/form/AuthFormContainer";
import OtpField from "@/components/ui/OtpField";
import AppButton from "@/components/ui/AppButton";
import tw from "twrnc";
import client from "@/components/api/client";
import axios from "axios";
import colors from "@/constants/Colors";
import { OtpInput } from "react-native-otp-entry";
import Toast from "react-native-toast-message";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "@/@types/navigation";
import Toaster from "@/components/ui/reuseables/Toaster";

interface Props {
  route: any;
}

const otpFields = new Array(6).fill("");
const Verification: FC<Props> = ({ route }) => {
  const { userInfo } = route.params;
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterType, setToasterType] = useState<"success" | "info" | "error">(
    "info"
  );

  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [countDown, setCountDown] = useState(60);
  const [canSendNewOtpRequest, setCanSendNewOtpRequest] = useState(false);
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
  // console.log({ otp });
  const handlePaste = (value: string) => {
    if (value.length === 6) {
      Keyboard.dismiss();
      const newOtp = value.split("");
      setOtp([...newOtp]);
    }
  };
  const isValidOtp = otp.every((value) => {
    return value.trim();
  });
  const handleSubmit = async () => {
    setSubmitting(true);
    if (!isValidOtp) return;
    try {
      // Await the response from the post request
      const response = await client.post("/auth/verify-email", {
        userId: userInfo.id,
        token: otp.join(""),
      });

      // Now you can destructure the data safely
      const { data } = response;

      // You can now use the data as needed
      console.log(data); // Process the data as needed

      // navigate to sign in
      navigation.navigate("Login");
    } catch (error) {
      console.log({ error });

      setSubmitting(false);
    }
    setSubmitting(false);
  };

  const requestForNewOtp = async () => {
    setCountDown(60);
    setCanSendNewOtpRequest(false);
    try {
      await client.post("/auth/re-verify-email", {
        userId: userInfo.id,
      });
      setToasterMessage("Verification Successful 🎉🎊");
      setToasterType("success");
      setShowToaster(true);
    } catch (error) {
      console.log("requesting for new otp", error);
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);
  useEffect(() => {
    if (canSendNewOtpRequest) return;

    const intervalId = setInterval(() => {
      setCountDown((oldCountDown) => {
        if (oldCountDown <= 0) {
          setCanSendNewOtpRequest(true);
          clearInterval(intervalId);

          return 0;
        }
        return oldCountDown - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [canSendNewOtpRequest]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.PRIMARY,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {showToaster && (
          <Toaster
            message={toasterMessage}
            type={toasterType}
            translateY={0}
            onHide={() => setShowToaster(false)}
          />
        )}
        <Image
          style={styles.image}
          source={require("../../assets/images/IntroPage.jpg")}
        />
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ height: "100%", paddingHorizontal: 20 }}>
            <AuthFormContainer heading="">
              <View style={{ paddingHorizontal: 20 }}>
                <View style={tw`w-100  items-center justify-center`}>
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
                    <Text style={tw` text-2xl`}>
                      {" "}
                      check your registered email
                    </Text>
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <OtpInput
                    numberOfDigits={6}
                    onTextChange={handlePaste}
                    focusColor={colors.PRIMARY}
                    focusStickBlinkingDuration={400}
                    disabled={false}
                    type="numeric"
                    theme={{
                      pinCodeContainerStyle: {
                        borderColor: "whitesmoke",
                      },
                    }}
                  />
                </View>
                <View
                  style={[
                    tw`mt-25`,
                    { width: "70%", marginHorizontal: "auto" },
                  ]}
                >
                  <AppButton
                    busy={submitting}
                    title="Submit"
                    onPress={handleSubmit}
                  />
                </View>
                <View style={styles.linkContainer}>
                  {countDown > 0 ? (
                    <Text style={styles.countDown}>{countDown} sec</Text>
                  ) : null}
                  <AppLink
                    active={canSendNewOtpRequest}
                    title="Re-send OTP"
                    onPress={requestForNewOtp}
                  />
                </View>
              </View>
            </AuthFormContainer>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  linkContainer: {
    width: "100%",
    marginTop: 20,
    justifyContent: "flex-end",
    flexDirection: "row",
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
    width: 300,
    height: 300,
  },
  countDown: {
    color: colors.SECONDARY,
    marginRight: 7,
  },
});

export default Verification;

{
  /* {otpFields.map((_, index) => {
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
              })} */
}
