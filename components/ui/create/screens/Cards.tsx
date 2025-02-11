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
import { RootState } from "@/utils/store";
import { useSelector } from "react-redux";
import client from "@/components/api/client";
import axios from "axios";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
import ToggleBtn from "../components/ToggleBtn";
import FullCardComp from "../components/FullCardComp";

interface Props {}

const Cards: FC<Props> = (props) => {
  const { collectionId, busyAQuestion, collectionData } = useSelector(
    (state: {
      collection: {
        collectionId: string;
        busyAQuestion: boolean;
        collectionData: any;
      };
    }) => state.collection
  );
  const [stackStyle, setStackStyle] = React.useState("default");
  const [visible, setVisible] = React.useState(false);
  // console.log({ collectionData });
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
  const progress = calculateProgress(
    currentIndex + 1,
    collectionData?.cards.length
  );
  // console.log(collectionData.cards.length);
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
        message={" Add Cards panel"}
      />
      <ToggleBtn setStackStyle={setStackStyle} stackStyle={stackStyle} />
      {(collectionData?.cards?.length ?? 0) > 0 ? (
        <FullCardComp
          stackStyle={stackStyle}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          data={
            Array.isArray(collectionData?.cards) ? collectionData.cards : []
          }
          progress={progress}
        />
      ) : (
        <View style={tw`flex-1 w-full justify-center items-center`}>
          <Text variant={"bodyLarge"}>no card available for display 😔</Text>
        </View>
      )}
      {(collectionData?.cards?.length ?? 0) > 0 && (
        <View>
          <View style={tw`p-4 bg-white shadow-md rounded-md mb-4`}>
            <Text style={tw`text-xl font-bold`}>{collectionData?.title}</Text>
            <Text variant={"bodyLarge"} style={tw`text-base text-gray-600`}>
              description: {collectionData?.description}
            </Text>
            <Text variant={"bodyLarge"} style={tw`text-base text-gray-600`}>
              category: {collectionData?.category}
            </Text>
            <Text variant={"bodyLarge"} style={tw`text-base text-gray-600`}>
              visibility: {collectionData?.visibility}
            </Text>
            <Text variant={"bodyLarge"} style={tw`text-base text-gray-600`}>
              Number of Cards: {collectionData?.cards.length}
            </Text>
            <Text variant={"bodyLarge"} style={tw`text-base text-gray-600`}>
              Number of likes: {collectionData?.likes.length}
            </Text>
          </View>
        </View>
      )}

      <View style={{ marginBottom: 40 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    minWidth: 350,
    minHeight: 500,
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
