import { FC } from "react";
import { StyleSheet, View } from "react-native";
import FeedsBtn from "./FeedsBtn";
import { Text } from "react-native-paper";
import tw from "twrnc";
interface Props {
  name: string;
  likes: number;
  description: string;
}

const FeedDetails: FC<Props> = (props) => {
  const { name, likes, description } = props;
  return (
    <View style={styles.container}>
      <FeedsBtn />
      <View>
        <Text variant="titleMedium">{likes} likes</Text>
      </View>
      <View style={[tw`flex-row`]}>
        <Text variant="titleMedium" style={[tw`font-bold mr-2`]}>
          {name}:
        </Text>
        <Text variant="titleMedium">{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedDetails;
