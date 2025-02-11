import React, { FC, useState } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FlipCard from "react-native-flip-card";
import { Text, Button, IconButton } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import tw from "twrnc";
import TypeWriter from "react-native-typewriter";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  stackStyle: string;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  data: {
    question: string;
    answer: string;
    _id: string;
    collectionId: string;
  }[];
}

const CollectionSlider: FC<Props> = (props) => {
  const advert1 = require("../../../assets/images/cardCover.jpg");
  const advert2 = require("../../../assets/images/cardCover2.jpg");

  const { stackStyle, currentIndex, setCurrentIndex, data } = props;

  const [isFlipped, setIsFlipped] = useState<string>("");
  const handleReveal = (id: string) => {
    if (isFlipped == id) {
      setIsFlipped("");
    } else {
      setIsFlipped(id);
    }
  };

  const renderItem = ({
    item,
  }: {
    item: {
      question: string;
      answer: string;
      _id: string;
      collectionId: string;
    };
  }) => {
    return (
      <View style={styles.item}>
        <FlipCard
          style={styles.flipCard}
          flip={isFlipped === item._id}
          clickable={false}
        >
          {/* Front Side */}
          <View style={styles.card}>
            <Image
              style={{ width: 300, height: 400, borderRadius: 8 }}
              source={advert1}
            />
            <View
              style={tw`absolute inset-0 justify-center items-center bg-black bg-opacity-50 h-full`}
            >
              <Text style={tw`text-white text-lg text-center`}>
                {item.question}
              </Text>
            </View>
          </View>
          {/* Back Side */}
          <View style={styles.card}>
            <Image
              style={{ width: 300, height: 400, borderRadius: 8 }}
              source={advert2}
            />
            <View
              style={tw`absolute inset-0 justify-center items-center p-4 bg-white bg-opacity-40`}
            >
              {isFlipped ? (
                <View>
                  <TypeWriter
                    typing={1}
                    minDelay={10}
                    maxDelay={100}
                    style={tw`text-black text-lg text-center font-bold`}
                  >
                    {item.answer}
                  </TypeWriter>
                  <View style={tw`flex-row mt-4 `}>
                    <IconButton
                      icon={() => (
                        <MaterialIcons
                          name="check-circle"
                          size={35}
                          color="green"
                        />
                      )}
                      onPress={() => console.log("Correct")}
                    />
                    <IconButton
                      icon={() => (
                        <MaterialIcons name="cancel" size={35} color="red" />
                      )}
                      onPress={() => console.log("Incorrect")}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={tw`text-white text-lg text-center`}>
                    {item.answer}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </FlipCard>
        <Button
          mode="contained"
          onPress={() => handleReveal(item._id)}
          style={tw`mt-4`}
        >
          Reveal
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        layout={stackStyle === "default" ? "default" : "stack"}
        data={data}
        renderItem={renderItem}
        sliderWidth={400}
        itemWidth={300}
        loop={true}
        autoplayInterval={3000}
        onSnapToItem={(index) => setCurrentIndex(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 300,
    minHeight: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: 300,
    height: 450,
    justifyContent: "center",
    alignItems: "center",
  },
  flipCard: {},
  card: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CollectionSlider;
