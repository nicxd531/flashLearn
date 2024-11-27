import AuthInputField from "@/components/form/AuthInputField";
import { FC, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as yup from "yup";
import SubmitBtn from "@/components/form/SubmitBtn";
import PasswordVisibilityIcon from "@/components/ui/PasswordVisibilityIcon";
import AppLink from "@/components/ui/AppLink";
import CircleUi from "@/components/ui/CircleUi";
import { Image } from "react-native";
import AuthFormContainer from "@/components/form/AuthFormContainer";
import Form from "@/components/form/Form";
import colors from "@/constants/Colors";

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

interface Props {}
const initialValues = {
  name: "",
  email: "",
  password: "",
};

const SignUp: FC<Props> = (props) => {
  const [secureEntry, setSecureEntry] = useState(true);

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };
  return (
    <Form
      onSubmit={(values) => {
        console.log({ values });
      }}
      initialValues={initialValues}
      validationSchema={signUpValidation}
    >
      <AuthFormContainer
        heading="welcome!"
        subHeading="let's  get started by creating an account for you "
      >
        <View style={styles.formContainer}>
          <AuthInputField
            name="name"
            placeholder="john doe"
            label="name"
            containerStyle={styles.marginBottom}
          />
          <AuthInputField
            name="email"
            placeholder="john@gmail.com"
            label="email"
            keyboardType="email-address"
            containerStyle={styles.marginBottom}
          />
          <AuthInputField
            name="password"
            placeholder="********"
            label="Password"
            autoCapitalize="none"
            secureTextEntry={secureEntry}
            containerStyle={styles.marginBottom}
            rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
            onRightIconPress={togglePasswordView}
          />
          <SubmitBtn title="Sign Up" />
          <View style={styles.linkConainer}>
            <AppLink link="/LostPassword" title="I lost my password" />
            <AppLink link="/Login" title="Log In" />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
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
  linkConainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default SignUp;
