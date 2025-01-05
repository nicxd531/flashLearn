import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface NotificationModalProps {
  visibleM: boolean;
  onClose: () => void;
  message: string;
}

const MessageModal: React.FC<NotificationModalProps> = ({
  visibleM,
  onClose,
  message,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visibleM}
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
          <ScrollView>
            <Text style={styles.message}>{message}</Text>
          </ScrollView>
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
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {},
});

export default MessageModal;
