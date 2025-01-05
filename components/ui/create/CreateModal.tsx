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
import { Button, Divider, Text, TextInput } from "react-native-paper";
import tw from "twrnc";
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
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [qaList, setQaList] = React.useState<
    { question: string; answer: string }[]
  >([]);
  const addQaItem = () => {
    if (question && answer) {
      setQaList([...qaList, { question, answer }]);
      setQuestion("");
      setAnswer("");
    }
  };

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
              <View style={tw`w-75`}>
                <TextInput
                  label="Question"
                  value={question}
                  onChangeText={(question) => setQuestion(question)}
                  style={{ backgroundColor: "transparent" }}
                />
                <TextInput
                  label="Answer"
                  value={answer}
                  onChangeText={(answer) => setAnswer(answer)}
                  style={{
                    backgroundColor: "transparent",
                    textAlignVertical: "top",
                  }}
                  multiline
                  textAlignVertical="top"
                />
                <Button
                  mode="contained"
                  onPress={() => addQaItem()}
                  style={styles.addButton}
                >
                  Add
                </Button>
              </View>
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
              />
            </ScrollView>
          </View>
        </View>
      </View>
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
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {},
  addButton: {
    marginTop: 10,
  },
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

export default CreateModal;
