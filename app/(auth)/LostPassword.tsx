import AuthInputField from "@/components/form/AuthInputField";

import { FC } from "react";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as yup from "yup";
import SubmitBtn from "@/components/form/SubmitBtn";
import AppLink from "@/components/ui/AppLink";
import AuthFormContainer from "@/components/form/AuthFormContainer";
import Form from "@/components/form/Form";
import colors from "@/constants/Colors";
import tw from "twrnc";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
  FadeInDown,
} from "react-native-reanimated";
import { FormikHelpers } from "formik";
import client from "@/components/api/client";
const lostPasswordSchema = yup.object({
  email: yup
    .string()
    .trim("Name is missing")
    .email("Invalid email")
    .required("email is required"),
});

interface Props {
  navigation: any;
}
interface initialValue {
  email: string;
}
const initialValues = {
  email: "",
};

const LostPassword: FC<Props> = ({ navigation }) => {
  const handleSubmit = async (
    values: initialValue,
    actions: FormikHelpers<initialValue>
  ) => {
    try {
      actions.setSubmitting(true);
      const { data } = await client.post("/auth/forget-password", {
        ...values,
      });
      console.log({ data });
    } catch (err) {
      console.log("lost password err", err);
    }
    actions.setSubmitting(false);

    // send information to api
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1 }}>
        <Image
          style={styles.image}
          source={require("../../assets/images/IntroPage.jpg")}
        />
        <View style={styles.overlay} />
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={lostPasswordSchema}
        >
          <AuthFormContainer
            heading="Forget Password!"
            subHeading="did you forget your password, don't worry we will help you get back in"
          >
            <View style={tw`w-100 items-center justify-center`}>
              <Image
                style={styles.png}
                source={require("../../assets/images/forgetPassword.png")}
              />
            </View>
            <View style={styles.formContainer}>
              <AuthInputField
                name="email"
                placeholder="john@gmail.com"
                label="email"
                keyboardType="email-address"
                containerStyle={styles.marginBottom}
                delay={501}
              />
              <View style={tw`mt-10`}>
                <Animated.View
                  entering={FadeInDown.delay(502).duration(1500).springify()}
                >
                  <SubmitBtn title="Sign link" />
                </Animated.View>
                <Animated.View
                  style={styles.linkContainer}
                  entering={FadeInDown.delay(506).duration(1500).springify()}
                >
                  <AppLink
                    onPress={() => navigation.navigate("Login")}
                    title="Log in"
                  />
                  <AppLink
                    onPress={() => navigation.navigate("SignUp")}
                    title="Sign UP"
                  />
                </Animated.View>
              </View>
            </View>
          </AuthFormContainer>
        </Form>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  formContainer: {
    width: "100%",
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
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

export default LostPassword;
