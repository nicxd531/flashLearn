import { FC, ReactNode } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CircleUi from "../ui/CircleUi";
import colors from "@/constants/Colors";

interface Props {
  children: ReactNode;
  heading?: string;
  subHeading?: string;
}

const AuthFormContainer: FC<Props> = ({ children, heading, subHeading }) => {
  return (
    <View style={styles.container}>
      <CircleUi position="top-left" size={200} />
      <CircleUi position="top-right" size={100} />
      <CircleUi position="bottom-left" size={100} />
      <CircleUi position="bottom-right" size={200} />

      <View style={styles.headerContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/appicon.png")}
        />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    overflow: "hidden",
  },
  headerContainer: { width: "100%", marginBottom: 20 },
  heading: {
    color: colors.SECONDARY,
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  subHeading: { color: colors.CONTRAST, fontSize: 16 },
  image: {
    width: 100,
    height: 100,
  },
});

export default AuthFormContainer;
