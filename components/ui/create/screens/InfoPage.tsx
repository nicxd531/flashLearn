import React, { FC, useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import tw from "twrnc";
import RNPickerSelect from "react-native-picker-select";
import PosterPreview from "../PosterPreview";
import { categories } from "@/utils/Categories";
import * as yup from "yup";
import client from "@/components/api/client";
import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";

import TextHCheckBox from "../../reuseables/TextHCheckBox";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@backpackapp-io/react-native-toast";
import { collectionInfoSchema, FromFields } from "@/@types/reuseables";
import { RootState } from "@/utils/store"; // Import RootState
import {
  updateBusyStateCollection,
  updateCollectionId,
} from "@/utils/store/Collection";
import BtnRNPIcon from "../../reuseables/BtnRNPIcon";
import axios from "axios";
interface Props {
  setActive: (p: any) => void;
  collectionInfo: FromFields;
  setCollectionInfo: React.Dispatch<React.SetStateAction<FromFields>>;
}

const InfoPage: FC<Props> = (props) => {
  const { busyACollection } = useSelector(
    (state: RootState) => state.collection
  );

  const dispatch = useDispatch();
  const { collectionInfo, setCollectionInfo } = props;
  const [checked, setChecked] = React.useState(false);
  const formattedCategories = categories.map((category) => ({
    label: category,
    value: category.replace(/ /g, " "),
  }));

  const visibility = checked ? "public" : "private";

  const handleSubmit = async () => {
    dispatch(updateBusyStateCollection(true));
    try {
      const finalData = await collectionInfoSchema.validate(collectionInfo);
      const formData = new FormData();
      const { category, title, description } = finalData;

      formData.append("title", title);
      formData.append("description", description);
      if (category) {
        formData.append("category", category);
      } else {
        console.error("Category is missing or undefined");
      }
      formData.append("visibility", visibility);

      if (
        finalData.poster?.uri &&
        finalData.poster?.name &&
        finalData.poster?.type
      ) {
        formData.append("poster", {
          uri: finalData.poster.uri,
          name: finalData.poster.name,
          type: finalData.poster.type,
        } as any); // Cast to any to avoid type errors
      } else {
        console.error("Poster is missing or incomplete");
      }

      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      if (!token) {
        throw new Error("User is not authenticated. Token is missing.");
      }

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const response = await client.post("/collection/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 201) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.data;
      toast.success("Collection Created 🎉🎊");
      console.log("Response data:", data);

      props.setActive((p: number) => p + 1);
    } catch (error) {
      console.error("Error during submission:", error);
      if (error instanceof yup.ValidationError) {
        console.log("Validation error:", error.message);
        toast.error(error.message + "❌");
      } else if (axios.isAxiosError(error)) {
        console.error(
          "Axios error:",
          error.response?.data?.message || error.message
        );
        toast.error(error.response?.data?.message || error.message + "❌");
      } else {
        console.log("Unexpected error:", (error as Error).message || error);
        toast.error((error as Error).message || error + "❌");
      }
    } finally {
      dispatch(updateBusyStateCollection(false));
    }
  };
  useEffect(() => {
    setCollectionInfo({ ...collectionInfo, visibility });
  }, [checked]);

  return (
    <View style={styles.container}>
      <View style={[styles.heading]}>
        <Text style={[tw`font-bold  w-full `]} variant="headlineMedium">
          Info Page
        </Text>
      </View>
      <TextInput
        label="Title"
        value={collectionInfo.title}
        onChangeText={(title) =>
          setCollectionInfo({ ...collectionInfo, title })
        }
        style={{ backgroundColor: "transparent" }}
      />
      <TextInput
        label="Description"
        value={collectionInfo.description}
        onChangeText={(description) =>
          setCollectionInfo({ ...collectionInfo, description })
        }
        style={{
          backgroundColor: "transparent",
          textAlignVertical: "top",
        }}
        multiline
        textAlignVertical="top"
      />
      <RNPickerSelect
        onValueChange={(category) =>
          setCollectionInfo({ ...collectionInfo, category })
        }
        items={formattedCategories}
        placeholder={{ label: "categories", value: null }}
      />
      <TextHCheckBox checked={checked} setChecked={setChecked} />
      <View style={{ width: 380, alignItems: "center" }}>
        {/* <PosterPreview
          collectionInfo={collectionInfo}
          setCollectionInfo={setCollectionInfo}
        /> */}
      </View>
      <View style={[{ width: "60%", marginHorizontal: "auto" }, tw`mt-5`]}>
        <BtnRNPIcon
          busyACollection={busyACollection}
          handleSubmit={handleSubmit}
          title="Save Collection"
          iconName="save"
        />
      </View>
      <View style={{ height: 150 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  heading: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },
});

export default InfoPage;
