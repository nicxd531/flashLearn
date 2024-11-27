import AuthInputField from "@/components/form/AuthInputField";

import { FC } from "react";
import { StyleSheet, View } from "react-native";
import * as yup from "yup";
import SubmitBtn from "@/components/form/SubmitBtn";
import AppLink from "@/components/ui/AppLink";
import AuthFormContainer from "@/components/form/AuthFormContainer";
import Form from "@/components/form/Form";
import colors from "@/constants/Colors";

const lostPasswordSchema = yup.object({
  email: yup
    .string()
    .trim("Name is missing")
    .email("Invalid email")
    .required("email is required"),
});

interface Props {}
const initialValues = {
  email: "",
};

const LostPassword: FC<Props> = (props) => {
  return (
    <Form
      onSubmit={(values) => {
        console.log({ values });
      }}
      initialValues={initialValues}
      validationSchema={lostPasswordSchema}
    >
      <AuthFormContainer
        heading="Forget Password!"
        subHeading="did you forget your password, don't worry we will help you get back in"
      >
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="john@gmail.com"
            label="email"
            keyboardType="email-address"
            containerStyle={styles.marginBottom}
          />
          <SubmitBtn title="Sign link" />
          <View style={styles.linkConainer}>
            <AppLink link="/Login" title="Log in" />
            <AppLink link="Signup" title="Sign UP" />
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

export default LostPassword;
