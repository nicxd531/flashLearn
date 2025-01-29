import React, { useState, useEffect } from "react";
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
import { FromFields } from "@/@types/reuseables";

interface props {
  collectionInfo: FromFields;
  setCollectionInfo: React.Dispatch<React.SetStateAction<FromFields>>;
}

const PosterPreview: React.FC<props> = (props) => {
  const { collectionInfo, setCollectionInfo } = props;
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImageUri(asset.uri);
      setCollectionInfo({
        ...collectionInfo,
        poster: {
          uri: asset.uri,
          name: asset.fileName || "image.jpg",
          type: asset.type || "image/jpeg",
          size: asset.fileSize || 0,
        },
      });
    }
  };
  useEffect(() => {
    console.log({ collectionInfo });
  }, [collectionInfo]);

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
            width: 300,
            height: "100%",
            marginTop: 16,
            borderRadius: 8,
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
