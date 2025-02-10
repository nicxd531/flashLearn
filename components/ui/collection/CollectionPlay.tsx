import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import FullCardComp from "../create/components/FullCardComp";
import { useSelector } from "react-redux";
import tw from "twrnc";

interface Props {}

const CollectionPlay: FC<Props> = (props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const advert1 = require("../../../assets/images/advert1.jpg");
  const advert2 = require("../../../assets/images/advert2.jpg");
  const advert3 = require("../../../assets/images/advert3.jpg");
  const data = [
    { title: "Item 1", image: advert1 },
    { title: "Item 2", image: advert2 },
    { title: "Item 3", image: advert3 },
  ];
  const { collectionId, busyAQuestion, collectionData } = useSelector(
    (state: RootState) => state.collection
  );
  const calculateProgress = (
    currentCardIndex: number,
    totalCards: number
  ): number => {
    if (totalCards === 0) return 0; // Avoid division by zero
    return currentCardIndex / totalCards;
  };
  const [stackStyle, setStackStyle] = React.useState("default");
  const [visible, setVisible] = React.useState(false);
  const progress = calculateProgress(currentIndex + 1, data.length);
  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    minWidth: 350,
    minHeight: 500,
    paddingTop: 60,
  },
});

export default CollectionPlay;
