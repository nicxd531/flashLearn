import React, { FC } from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  AnimatedFAB,
  Button,
  Checkbox,
  Text,
  TextInput,
} from "react-native-paper";
import tw from "twrnc";
import RNPickerSelect from "react-native-picker-select";
import PosterPreview from "../PosterPreview";

interface Props {
  setActive: (p: any) => void;
}

const InfoPage: FC<Props> = (props) => {
  const [text, setText] = React.useState("");
  const [des, setDes] = React.useState("");
  const [isExtended, setIsExtended] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const fabStyle = { ["right"]: 16 };
  const handleSave = () => {};
  return (
    <View style={styles.container}>
      <View style={[styles.heading]}>
        <Text style={[tw`font-bold  w-full `]} variant="headlineMedium">
          Info Page
        </Text>
      </View>
      <TextInput
        label="Title"
        value={text}
        onChangeText={(text) => setText(text)}
        style={{ backgroundColor: "transparent" }}
      />
      <TextInput
        label="Description"
        value={des}
        onChangeText={(des) => setDes(des)}
        style={{
          backgroundColor: "transparent",
          textAlignVertical: "top",
        }}
        multiline
        textAlignVertical="top"
      />
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          { label: "Football", value: "football" },
          { label: "Baseball", value: "baseball" },
          { label: "Hockey", value: "hockey" },
        ]}
      />
      <View style={[tw`flex-row justify-between  items-center w-50 ml-4`]}>
        <Text>Make collection public</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <PosterPreview />
      </View>
      <Button
        icon="content-save"
        mode="contained"
        style={{
          marginTop: 20,
          width: "70%",
          marginHorizontal: "auto",
          paddingVertical: 10,
        }}
        onPress={() => props.setActive((p: any) => p + 1)}
      >
        save Collection
      </Button>
      <View style={{ height: 150 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  heading: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },
});

export default InfoPage;
