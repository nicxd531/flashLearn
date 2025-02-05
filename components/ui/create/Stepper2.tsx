import React, { useState } from "react";
import Stepper from "react-native-stepper-ui";
import { View, Alert, Text } from "react-native";
import tw from "twrnc";
import colors from "@/constants/Colors";
import InfoPage from "./screens/InfoPage";
import Cards from "./screens/Cards";
import { categories } from "@/utils/Categories";
import * as yup from "yup";
import { defaultForm } from "@/@types/reuseables";
import { useDispatch } from "react-redux";
import { updateCollectionId } from "@/utils/store/Collection";

const Stepper2 = () => {
  const [collectionInfo, setCollectionInfo] = React.useState({
    ...defaultForm,
  });

  const [active, setActive] = useState(0);
  const collectionInfoSchema = yup.object().shape({
    title: yup.string().trim().required("Title is missing!"),
    category: yup.string().oneOf(categories, "Category is missing "),
    description: yup.string().trim().required("Description is missing!"),
    poster: yup.object().shape({
      uri: yup.string().required("collection poster is missing!"),
    }),
  });
  const dispatch = useDispatch();
  const content = [
    <InfoPage
      collectionInfo={collectionInfo}
      setCollectionInfo={setCollectionInfo}
      setActive={setActive}
    />,
    <Cards />,
  ];
  const handleFinish = () => {
    setActive((p) => p - 1);
    setCollectionInfo({
      ...defaultForm,
    });
    dispatch(updateCollectionId(""));
  };

  return (
    <View style={{ marginVertical: 20, flex: 1 }}>
      <Stepper
        showButton={active > 0}
        buttonStyle={{
          backgroundColor: colors.PRIMARY,
          justifyContent: "space-between",
          borderRadius: 10,
          marginTop: 20,
        }}
        wrapperStyle={{
          justifyContent: "center",
          alignItems: "center",
          // height: 500,
          width: "100%",
          // paddingBottom: 100,
        }}
        active={active}
        content={content}
        onNext={() => setActive((p) => p + 1)}
        onBack={() => setActive((p) => p - 1)}
        onFinish={handleFinish}
      />
    </View>
  );
};

export default Stepper2;
