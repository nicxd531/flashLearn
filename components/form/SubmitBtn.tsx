import { useFormikContext } from "formik";
import { FC } from "react";
import { StyleSheet } from "react-native";
import AppButton from "../ui/AppButton";

interface Props {
  title: string;
}

const SubmitBtn: FC<Props> = (props) => {
  const { handleSubmit } = useFormikContext();
  
  const submit =()=>{
    handleSubmit()


  }
  return <AppButton onPress={() =>submit() } title={props.title} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default SubmitBtn;
