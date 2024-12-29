import AuthInputField from "@/components/form/AuthInputField";

import { FC, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import * as yup from "yup";
import SubmitBtn from "@/components/form/SubmitBtn";
import PasswordVisibilityIcon from "@/components/ui/PasswordVisibilityIcon";
import AppLink from "@/components/ui/AppLink";
import AuthFormContainer from "@/components/form/AuthFormContainer";
import Form from "@/components/form/Form";
import colors from "@/constants/Colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import tw from "twrnc";
import { FormikHelpers } from "formik";
import client from "@/components/api/client";
import {
  updateLoading,
  updateLoggedInState,
  updateProfile,
} from "@/utils/store/auth";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { KeyboardAvoidingView } from "react-native";

const { height } = Dimensions.get("window");

const signUpValidation = yup.object({
  email: yup
    .string()
    .trim("Name is missing")
    .email("Invalid email")
    .required("email is required"),
  password: yup
    .string()
    .trim("password is missing")
    .min(8, "password is too short")

    .required("password is required"),
});

interface SignInUserInfo {
  email: string;
  password: string;
}
interface Props {
  navigation: any;
}
const initialValues = {
  email: "",
  password: "",
};

const SignIn: FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const translateY = useSharedValue(height); // Start off-screen

  // Animated style that uses the translateY shared value
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  useEffect(() => {
    // Animate the view to slide in from the bottom
    translateY.value = withTiming(height * 0.2, { duration: 500 }); // Cover 80% of the screen height
  }, [translateY]);
  const [secureEntry, setSecureEntry] = useState(true);

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };
  const handleSubmit = async (
    values: SignInUserInfo,
    actions: FormikHelpers<SignInUserInfo>
  ) => {
    try {
      actions.setSubmitting(true);
      const { data } = await client.post("/auth/sign-in", {
        ...values,
      });
      dispatch(updateLoggedInState(false));

      dispatch(updateLoading(false));
      dispatch(updateProfile(data.profile));
      dispatch(updateLoading(true));
      dispatch(updateLoggedInState(true));
      dispatch(updateLoading(false));

      console.log({ data });
      Toast.show({
        text1: "success",
        text2: "Log In Successful 🎉🎊",
        type: "success", // can be 'success', 'error', 'info'
        position: "top", // 'top', 'bottom', 'center'
        visibilityTime: 4000, // duration in milliseconds
        autoHide: true, // auto hide after visibilityTime
      });
    } catch (err) {
      console.log("sign in err", err);
      Toast.show({
        text1: "Error",
        text2: "Log In error ❌",
        type: "error", // can be 'success', 'error', 'info'
        position: "top", // 'top', 'bottom', 'center'
        visibilityTime: 4000, // duration in milliseconds
        autoHide: true, // auto hide after visibilityTime
      });
    }
    actions.setSubmitting(false);

    // send information to api
  };
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
        <Image
          style={styles.image}
          source={require("../../assets/images/IntroPage.jpg")}
        />
        {/* <View style={styles.overlay} /> */}
        <View style={styles.pngCover}>
          <Image
            style={{ width: 300, height: 300 }}
            source={require("../../assets/images/Login.png")}
          />
        </View>
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={signUpValidation}
        >
          <AuthFormContainer
            heading="Please, Log In."
            subHeading="Welcome Back!"
          >
            <View style={styles.formContainer}>
              <View>
                <AuthInputField
                  name="email"
                  placeholder="Email"
                  label="email"
                  keyboardType="email-address"
                  containerStyle={styles.marginBottom}
                  delay={502}
                />
                <AuthInputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  autoCapitalize="none"
                  secureTextEntry={secureEntry}
                  containerStyle={styles.marginBottom}
                  rightIcon={
                    <PasswordVisibilityIcon privateIcon={secureEntry} />
                  }
                  onRightIconPress={togglePasswordView}
                  delay={505}
                />
                <View style={{ width: "100%", alignItems: "flex-end" }}>
                  <AppLink
                    onPress={() => navigation.navigate("LostPassword")}
                    title="Forgot Password?"
                  />
                </View>
              </View>
              <View style={tw`mt-3`}>
                <SubmitBtn title="Sign In" />
                <View style={[styles.linkContainer, tw`mt-2`]}>
                  <Text style={{ color: "grey" }}>Don't have an account?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignUp")}
                  >
                    <Text style={{ color: "black" }}> Get Started</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </AuthFormContainer>
        </Form>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    width: "100%",
    justifyContent: "space-between",
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    width: "100%",

    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    right: 0,
    flex: 1,
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
  },
  pngCover: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    marginTop: 10,
  },
});

export default SignIn;
