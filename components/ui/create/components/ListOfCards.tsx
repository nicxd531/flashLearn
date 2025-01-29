import { FC } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import tw from "twrnc";

interface Props {
  qaList: { question: string; answer: string }[];
}

const ListOfCards: FC<Props> = (props) => {
  const { qaList } = props;
  const renderItem = ({
    item,
  }: {
    item: { question: string; answer: string };
  }) => (
    <View style={styles.qaItem}>
      <Text style={styles.qaQuestion}>Q: {item.question}</Text>
      <Text style={styles.qaAnswer}>A: {item.answer}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text
        style={[tw`font-bold w-full text-center mt-4 mb-2`]}
        variant="titleLarge"
      >
        Cards
      </Text>
      <Divider />
      <FlatList
        data={qaList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.qaList}
        ListFooterComponent={<View style={{ height: 150 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  qaList: {
    marginTop: 20,
  },
  qaItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  qaQuestion: {
    fontWeight: "bold",
  },
  qaAnswer: {
    marginTop: 5,
  },
});

export default ListOfCards;
