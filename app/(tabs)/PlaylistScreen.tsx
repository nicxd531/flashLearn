import MiniNav from "@/components/ui/reuseables/MiniNav";
import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";
import tw from "twrnc";
interface Props {}

const PlaylistScreen: FC<Props> = (props) => {
  const [screen1, setScreen1] = useState(true);

  return (
    <View style={styles.container}>
      <Surface style={[tw`py-3`]}>
        <MiniNav
          btn1="Collections"
          btn2="Playlist"
          setState={setScreen1}
          state={screen1}
        />
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PlaylistScreen;
