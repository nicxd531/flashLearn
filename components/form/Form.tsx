import { Formik, FormikHandlers } from "formik";
import { ReactNode } from "react";

interface Props<T> {
  initialValues: any;
  validationSchema: any;
  onSubmit(values: T, formikHelper: FormikHandlers<T>): void;
  children: ReactNode;
}

const Form = <T extends object>(props: Props<T>) => {
  return (
    <Formik
      onSubmit={props.onSubmit}
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
    >
      {props.children}
    </Formik>
  );
};

export default Form;
