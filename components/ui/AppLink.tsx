import { Link, RelativePathString } from "expo-router";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Props {
  title: string;
  onPress?(): void;
  
}

const AppLink: FC<Props> = ({ title, onPress }) => {
 

  return (
    <Pressable>
      <Text style={styles.title} onPress={onPress}>
        {title}
      </Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  title: {},
});

export default AppLink;
