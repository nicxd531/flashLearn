import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import FullCardComp from "../../components/ui/create/components/FullCardComp";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store";
import tw from "twrnc";
import CollectionCards from "@/components/ui/reuseables/CollectionCards";
import ToggleBtn from "@/components/ui/create/components/ToggleBtn";

interface Props {}

const CollectionPlay: FC<Props> = (props) => {
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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

  return (
    <View style={[styles.container]}>
      <Text style={[tw`font-bold mt-4 mb-5`]} variant={"titleLarge"}>
        Collection Names
      </Text>
      <ToggleBtn setStackStyle={setStackStyle} stackStyle={stackStyle} />
      {(collectionData?.cards?.length ?? 0) > 0 ? (
        <CollectionCards
          stackStyle={stackStyle}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          data={
            Array.isArray(collectionData?.cards) ? collectionData?.cards : []
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
    paddingBottom: 50,
  },
});

export default CollectionPlay;
