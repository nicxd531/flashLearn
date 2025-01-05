import React, { FC, useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CardsSlider from "../../reuseables/CardsSlider";
import { Surface, Text, ToggleButton } from "react-native-paper";
import tw from "twrnc";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@/constants/Colors";
import CreateModal from "../CreateModal";
import * as Progress from "react-native-progress";
import { toast, Toasts } from "@backpackapp-io/react-native-toast";

interface Props {}

const Cards: FC<Props> = (props) => {
  const [stackStyle, setStackStyle] = React.useState("default");
  const [visible, setVisible] = React.useState(false);
  const onClose = () => {};
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const advert1 = require("../../../../assets/images/advert1.jpg");
  const advert2 = require("../../../../assets/images/advert2.jpg");
  const advert3 = require("../../../../assets/images/advert3.jpg");
  const data = [
    { title: "Item 1", image: advert1 },
    { title: "Item 2", image: advert2 },
    { title: "Item 3", image: advert3 },
  ];
  const calculateProgress = (
    currentCardIndex: number,
    totalCards: number
  ): number => {
    if (totalCards === 0) return 0; // Avoid division by zero
    return currentCardIndex / totalCards;
  };
  const progress = calculateProgress(currentIndex + 1, data.length);
  useEffect(() => {
    toast.success("we are i uin");
  }, []);
  return (
    <View style={styles.container}>
      <View style={[styles.heading]}>
        <Text style={[tw`font-bold `]} variant="titleLarge">
          Add cards
        </Text>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: colors.PRIMARY,
            padding: 3,
            marginLeft: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setVisible(true);
          }}
        >
          <AntDesign name="plus" color={"#fff"} size={20} />
        </TouchableOpacity>
      </View>
      <CreateModal
        visible={visible}
        onClose={() => setVisible(false)}
        message={"message panel"}
      />
      <Surface
        style={tw`flex-row justify-between items-center w-25 p-2 rounded-lg m-auto align-center mb-6 `}
      >
        <ToggleButton.Group
          onValueChange={(stackStyle) => setStackStyle(stackStyle)}
          value={stackStyle}
        >
          <ToggleButton
            icon={() => (
              <MaterialCommunityIcons
                name="view-carousel-outline"
                size={30}
                color={colors.PRIMARY}
                onPress={() => setStackStyle("default")}
              />
            )}
            value="left"
          />
          <ToggleButton
            icon={() => (
              <MaterialCommunityIcons
                name="cards"
                size={30}
                color={colors.PRIMARY}
                onPress={() => setStackStyle("stack")}
              />
            )}
            value="right"
          />
        </ToggleButton.Group>
      </Surface>
      <View style={tw`flex-1`}>
        <CardsSlider
          stackStyle={stackStyle}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          data={data}
        />
      </View>
      <View
        style={tw`flex-row justify-center items-center w-full m-auto mt-10 flex-col`}
      >
        <Progress.Bar progress={progress} width={200} color={colors.PRIMARY} />

        <Text style={[styles.counter, tw`mt-2`]}>
          {currentIndex + 1} / {data.length}
        </Text>
      </View>
      <View style={{ marginBottom: 40 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  heading: {
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginBottom: 20,
    marginTop: 50,
    flexDirection: "row",
  },
  counter: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Cards;
