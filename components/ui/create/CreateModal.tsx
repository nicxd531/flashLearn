import client from "@/components/api/client";
import { RootState } from "@/utils/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Button, Divider, List, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import AddQuestionInput from "./components/AddQuestionInput";
import ListOfCards from "./components/ListOfCards";
import { updateBusyStateQuestion } from "@/utils/store/Collection";
import { cardsInfoSchema } from "@/@types/reuseables";
import { toast, Toasts } from "@backpackapp-io/react-native-toast";
import axios from "axios";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
import * as yup from "yup";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

const CreateModal: React.FC<NotificationModalProps> = ({
  visible,
  onClose,
  message,
}) => {
  const { collectionId, busyAQuestion } = useSelector(
    (state: RootState) => state.collection
  );
  console.log("collectionId", collectionId);
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [qaList, setQaList] = React.useState<
    { question: string; answer: string }[]
  >([]);
  const dispatch = useDispatch();

  const addQaItem = async () => {
    console.log({ busyAQuestion });
    dispatch(updateBusyStateQuestion(true));
    try {
      const finalData = await cardsInfoSchema.validate({ question, answer });
      if (question && answer) {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN); // Fetch the token from AsyncStorage
        if (!token) {
          throw new Error("User is not authenticated. Token is missing.");
        }

        const { data } = await client.post(
          "/collection/create-Card",
          {
            question,
            answer,
            collectionId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the Authorization header
            },
          }
        );
        toast.success("Card Created 🎉🎊");
        console.log("data", data);
        setQaList([...qaList, { question, answer }]);
        setQuestion("");
        setAnswer("");
      }
    } catch (error) {
      toast.error("❌", { icon: "❌" });
      if (error instanceof yup.ValidationError) {
        console.error(
          "Validation error:",
          (error as yup.ValidationError).message
        );
      } else if (axios.isAxiosError(error)) {
        console.error(
          "Axios error:",
          (error.response?.data?.message as string) || error.message
        );
        toast.error(
          (error.response?.data?.message as string) || error.message + "❌"
        );
      } else {
        console.error("Unexpected error:", (error as Error).message || error);
        toast.error((error as Error).message || error + "❌");
      }
    } finally {
      dispatch(updateBusyStateQuestion(false));
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialCommunityIcons
                size={30}
                name="close"
              ></MaterialCommunityIcons>
            </TouchableOpacity>
          </View>
          <View style={tw`w-full items-center`}>
            <ScrollView>
              <Text style={styles.message}>{message}</Text>
              <AddQuestionInput
                question={question}
                setQuestion={setQuestion}
                answer={answer}
                setAnswer={setAnswer}
                addQaItem={addQaItem}
                busyAQuestion={busyAQuestion}
              />
              <ListOfCards qaList={qaList} />
            </ScrollView>
          </View>
        </View>
      </View>
      <Toasts />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    height: "80%",
    overflow: "hidden",
  },
  message: {
    fontSize: 25,
    marginBottom: 20,
    marginHorizontal: "auto",
    fontWeight: "bold",
  },
  closeButton: {},
  addButton: {
    marginTop: 10,
  },
});

export default CreateModal;
