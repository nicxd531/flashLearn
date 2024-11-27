import { Link, RelativePathString } from "expo-router";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  onPress?(): void;
  link: string;
}

const AppLink: FC<Props> = ({ title, onPress, link }) => {
  return (
    <Pressable>
      <Link href={link as RelativePathString}>
        <Text style={styles.title} onPress={onPress}>
          {title}
        </Text>
      </Link>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  title: {},
});

export default AppLink;
