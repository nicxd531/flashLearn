import React, { useState } from "react";
import Stepper from "react-native-stepper-ui";
import { View, Alert, Text } from "react-native";
import tw from "twrnc";
import colors from "@/constants/Colors";
import InfoPage from "./screens/InfoPage";
import Cards from "./screens/Cards";
const MyComponent = (props: any) => {
  return (
    <View style={tw`flex-1 justify-center items-center w-full h-full`}>
      <Text>{props.title}</Text>
    </View>
  );
};
const Stepper2 = () => {
  const [active, setActive] = useState(0);
  const content = [<InfoPage setActive={setActive} />, <Cards />];
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
        onFinish={() => Alert.alert("Finish")}
      />
    </View>
  );
};

export default Stepper2;
