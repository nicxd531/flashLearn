import colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {}

const IntroPage: FC<Props> = (props) => {
  return (
    <View style={[styles.container]}>
      <Image
        style={styles.image}
        source={require("../../assets/images/auth-page.jpg")}
      />
      <View style={{ marginTop: 80, padding: 20 }}>
        <Text style={[styles.header, { width: "95%" }]}>
          Welcome to FlashLearn 📚
        </Text>
        <Text style={styles.subHeading}>
          Your personalized learning companion!
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: "100%", height: 300 }}
          source={require("../../assets/images/intropageGirl.png")}
        />
      </View>

      <View style={styles.buttons}>
        <Link
          href={"/Login"}
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: colors.PINK },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "500" }}>
              Log in
            </Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={"/Signup"}
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: colors.SECONDARY },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: "500" }}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    right: 0,
  },
  header: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "white",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "white",
    width: "70%",
  },
});

export default IntroPage;
