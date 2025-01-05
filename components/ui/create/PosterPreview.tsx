import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Surface } from "react-native-paper";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@/constants/Colors";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";

const PosterPreview: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  //   console.log({ imageUri });

  const handleImageUpload = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <Surface style={styles.container}>
      <View
        style={{
          position: "absolute",

          flexDirection: "column",
          right: 10,
          bottom: 20,
          zIndex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={handleImageUpload}>
          <Feather name="upload" size={25} color={colors.INACTIVE_CONTRAST} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setImageUri(null)}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={30}
            color={colors.INACTIVE_CONTRAST}
          />
        </TouchableOpacity>
      </View>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 20,
          }}
          PlaceholderContent={<ActivityIndicator size={40} />}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Feather
            name="upload"
            size={40}
            color={colors.SECONDARY}
            onPress={handleImageUpload}
          />
          <Text>Upload Image</Text>
        </View>
      )}
    </Surface>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 450,
    width: 350,
    borderRadius: 10,
    objectFit: "cover",
    // marginHorizontal: "auto",
  },
});

export default PosterPreview;
