import AuthInputField from "@/components/form/AuthInputField";

import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as yup from "yup";
import SubmitBtn from "@/components/form/SubmitBtn";
import PasswordVisibilityIcon from "@/components/ui/PasswordVisibilityIcon";
import AppLink from "@/components/ui/AppLink";
import AuthFormContainer from "@/components/form/AuthFormContainer";
import Form from "@/components/form/Form";
import colors from "@/constants/Colors";

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

interface Props {}
const initialValues = {
  email: "",
  password: "",
};

const SignIn: FC<Props> = (props) => {
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
      <AuthFormContainer heading="welcome BAck!">
        <View style={styles.formContainer}>
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
          <SubmitBtn title="Sign In" />
          <View style={styles.linkConainer}>
            <AppLink link="/LostPassword" title="I lost my password" />
            <AppLink link="/Signup" title="Sign UP" />
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

export default SignIn;
