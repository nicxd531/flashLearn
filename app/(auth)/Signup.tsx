import AuthInputField from "@/components/form/AuthInputField";
import { FC, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import * as yup from "yup";
import SubmitBtn from "@/components/form/SubmitBtn";
import PasswordVisibilityIcon from "@/components/ui/PasswordVisibilityIcon";
import { Image } from "react-native";
import AuthFormContainer from "@/components/form/AuthFormContainer";
import Form from "@/components/form/Form";
import colors from "@/constants/Colors";
import tw from "twrnc";
import { FormikHelpers } from "formik";
import axios from "axios";
import client from "@/components/api/client";
import { useNavigation } from "@react-navigation/native";

const signUpValidation = yup.object({
  name: yup
    .string()
    .trim("Name is missing")
    .min(3, "Invalid name")
    .required("name is required"),
  email: yup
    .string()
    .trim("Name is missing")
    .email("Invalid email")
    .required("email is required"),
  password: yup
    .string()
    .trim("password is missing")
    .min(8, "password is too short")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      "Password should contain both text, characters and number"
    )
    .required("password is required"),
});

interface Props {
  navigation: any;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const SignUp: FC<Props> = ({ navigation }) => {
  const [secureEntry, setSecureEntry] = useState(true);

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };
  const handleSubmit = async (
    values: NewUser,
    action: FormikHelpers<NewUser>
  ) => {
    try {
      const { data } = await client.post("/auth/create", {
        ...values,
      });
      navigation.navigate("Verification", {
        userInfo: data.user,
      });
    } catch (err) {
      console.log("sign up err", err);
    }
    // send information to api
  };
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={styles.image}
        source={require("../../assets/images/IntroPage.jpg")}
      />
      <View style={styles.overlay} />
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={signUpValidation}
      >
        <AuthFormContainer heading="New Account">
          <View style={styles.formContainer}>
            <AuthInputField
              name="name"
              placeholder="First Name"
              label="name"
              containerStyle={styles.marginBottom}
              delay={501}
            />
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
              placeholder="Password"
              label="Password"
              autoCapitalize="none"
              secureTextEntry={secureEntry}
              containerStyle={styles.marginBottom}
              rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
              onRightIconPress={togglePasswordView}
              delay={503}
            />
            <View style={tw`mt-12`}>
              <SubmitBtn title="Sign Up" />
              <View style={[styles.linkContainer, tw`mt-2`]}>
                <Text style={{ color: "grey" }}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={{ color: "black" }}> Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </AuthFormContainer>
      </Form>
    </View>
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
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
  },
});

export default SignUp;
