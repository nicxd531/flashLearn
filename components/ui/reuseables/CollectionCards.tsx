import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import * as Progress from "react-native-progress";
import tw from "twrnc";
import colors from "@/constants/Colors";
import CollectionSlider from "./CollectionSlider";

interface Props {
  stackStyle: any;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  data: any[];
  progress: number;
}

const CollectionCards: FC<Props> = (props) => {
  const { stackStyle, currentIndex, setCurrentIndex, data, progress } = props;
  return (
    <View style={[styles.container, tw` mt-3 w-full`]}>
      {data ? (
        <>
          <CollectionSlider
            stackStyle={stackStyle}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            data={data}
          />
          <View
            style={tw`flex-row justify-center items-center w-full mx-auto flex-col mt-3`}
          >
            <Progress.Bar
              progress={progress}
              width={200}
              color={colors.PRIMARY}
            />

            <Text style={[styles.counter, tw`mt-2`]}>
              {currentIndex + 1} / {data.length}
            </Text>
          </View>
        </>
      ) : (
        <View style={tw`flex-1`}>
          <Text variant={"bodyLarge"}>no card available for display 😔</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  counter: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cards: {
    flexDirection: "column",
  },
});

export default CollectionCards;
