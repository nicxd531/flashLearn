import UserDetails from "@/components/ui/profile/UserDetails";
import { FC, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import { Avatar } from "react-native-paper";
import tw from "twrnc";
import MiniNav from "@/components/ui/reuseables/MiniNav";
import Stats from "@/components/ui/profile/Stats";
import Collections from "@/components/ui/profile/Collections";
interface Props {}

const ProfileScreen: FC<Props> = (props) => {
  const [screen1, setScreen1] = useState(true);
  const image = require("../../assets/images/advert1.jpg");
  console.log(screen1);
  return (
    <View style={styles.container}>
      <View
        style={[
          {
            width: 300,
            height: 400,
            position: "absolute",
            right: 5,
            top: 5,
            borderRadius: 50,
          },
          tw`bg-red-500 w-full l-0 rounded-100 `,
        ]}
      >
        <Image
          style={{ height: 400, borderRadius: 20 }}
          source={image}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View
        style={[
          tw`flex-row items-center justify-center  absolute top-40v left-38w z-10 border-4 border-white rounded-full`,
        ]}
      >
        <Avatar.Image size={100} source={image} />
      </View>
      <View
        style={[
          {
            width: 300,
            height: "100%",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            backgroundColor: "white",
          },
          tw` w-full mt-50 `,
        ]}
      >
        <ScrollView>
          <UserDetails />
          <MiniNav
            btn1="stats"
            btn2="collections"
            setState={setScreen1}
            state={screen1}
          />
          {screen1 ? <Stats /> : <Collections />}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    position: "relative",
    overflow: "hidden",
  },
});

export default ProfileScreen;
