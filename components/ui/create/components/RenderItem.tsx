import { FC } from "react";
import { StyleSheet, View, Image } from "react-native";
import FlipCard from "react-native-flip-card";
import { Button, Text } from "react-native-paper";
import TypeWriter from "react-native-typewriter";
import tw from "twrnc";
interface Props {
  item: {
    question: string;
    answer: string;
    _id: string;
    collectionId: string;
  };
  isFlipped: boolean;
}

const RenderItem: FC<Props> = (props) => {
  const advert1 = require("../../../../assets/images/cardCover.jpg");
  const advert2 = require("../../../../assets/images/cardCover2.jpg");
  const { isFlipped, item } = props;
  return (
    <View style={styles.item}>
      <FlipCard style={styles.flipCard} flip={isFlipped} clickable={false}>
        {/* Front Side */}
        <View style={styles.card}>
          <Image
            style={{ width: 300, height: 400, borderRadius: 8 }}
            source={advert1}
          />
          <View
            style={tw`absolute inset-0 justify-center items-center p-4 bg-black bg-opacity-50`}
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
            style={tw`absolute inset-0 justify-center items-center p-4 bg-black bg-opacity-50`}
          >
            {isFlipped ? (
              <TypeWriter
                typing={1}
                minDelay={10}
                maxDelay={100}
                style={tw`text-white text-lg text-center`}
              >
                {item.answer}
              </TypeWriter>
            ) : (
              <Text style={tw`text-white text-lg text-center`}>
                {item.answer}
              </Text>
            )}
          </View>
        </View>
      </FlipCard>
      <Button
        mode="contained"
        onPress={() => setIsFlipped(!isFlipped)}
        style={tw`mt-4`}
      >
        Reveal
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
  flipCard: {
    width: 300,
    height: 400,
  },
  card: {
    width: 300,
    height: 400,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RenderItem;
