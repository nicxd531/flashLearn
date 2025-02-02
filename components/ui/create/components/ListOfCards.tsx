import React from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Divider, Text } from "react-native-paper";
import tw from "twrnc";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // Ensure the icon library is imported
import client from "@/components/api/client";
import { updateBusyStateQuestion } from "@/utils/store/Collection";
import { useDispatch } from "react-redux";
import { toast } from "@backpackapp-io/react-native-toast";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";

interface ListOfCardsProps {
  qaList: {
    question: string;
    answer: string;
    cardId: string;
    collectionId: string;
  }[];
  setQaList: React.Dispatch<
    React.SetStateAction<
      {
        question: string;
        answer: string;
        cardId: string;
        collectionId: string;
      }[]
    >
  >; // Add setQaList prop
  error: string | null;
}

const ListOfCards: React.FC<ListOfCardsProps> = ({
  qaList = [],
  setQaList,
  error,
}) => {
  const dispatch = useDispatch();
  const deleteItem = async (
    index: number,
    cardId: string,
    collectionId: string
  ) => {
    const token = await getFromAsyncStorage(Keys.AUTH_TOKEN); // Fetch the token from AsyncStorage
    if (!token) {
      throw new Error("User is not authenticated. Token is missing.");
    }
    console.log({ token });
    const url = `/collection/cards/${collectionId}/${cardId}`;

    try {
      console.log({ cardId });
      dispatch(updateBusyStateQuestion(true));
      const response = await client.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include your auth token if required
        },
      });
      console.log({ response });
      if (response.status === 200) {
        toast.success("card deleted ", { icon: "🎉🎊" });
        setQaList((prevQaList) => prevQaList.filter((_, i) => i !== index));
        dispatch(updateBusyStateQuestion(false));
      } else {
        console.error(`Failed to delete card: ${response.status}`);
        toast.error("Failed to delete card", { icon: "❌" });
      }
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error(error + "", { icon: "❌" });
      dispatch(updateBusyStateQuestion(false));
    }
  };
  console.log({ qaList });
  const renderItem = ({
    item,
    index,
  }: {
    item: {
      question: string;
      answer: string;
      cardId: string;
      collectionId: string;
    };
    index: number;
  }) => (
    <View style={styles.qaItem}>
      <View style={styles.qaTextContainer}>
        <Text style={styles.qaText}>Q: {item.question}</Text>
        <Text style={styles.qaText}>A: {item.answer}</Text>
      </View>
      <TouchableOpacity
        onPress={() => deleteItem(index, item.cardId, item.collectionId)}
      >
        <MaterialCommunityIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const text = (
    <View>
      <Text style={tw`text-lg font-bold`}>Cards</Text>
      <Divider />
    </View>
  );

  return (
    <View style={styles.container}>
      {qaList.length > 0 ? (
        <FlatList
          data={qaList}
          ListHeaderComponent={text}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.qaList}
          contentContainerStyle={styles.contentContainer} // Add contentContainerStyle
          showsVerticalScrollIndicator={false} // Remove vertical scroll bar
        />
      ) : (
        <View style={[tw`justify-center items-center h-full`, { flex: 1 }]}>
          <Text variant={"bodyLarge"}>no question or answers added 😔</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  qaList: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingBottom: 20, // Add padding to the bottom to ensure the last item is fully visible
  },
  qaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  qaTextContainer: {
    flex: 1,
  },
  qaText: {
    fontSize: 16,
  },
});

export default ListOfCards;
