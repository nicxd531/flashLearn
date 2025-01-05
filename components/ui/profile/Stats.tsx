import { FC } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, Surface, Text } from "react-native-paper";
import Chart from "./Chart";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import tw from "twrnc";
import colors from "@/constants/Colors";
interface Props {}

const Stats: FC<Props> = (props) => {
  return (
    <View style={[styles.container, tw`items-center `]}>
      <Surface
        style={[tw`flex-row mb-5 w-85 justify-between rounded-2xl p-4 mt-5`]}
      >
        <View style={[tw`flex-row items-center justify-between`]}>
          <View style={[tw`mr-2`]}>
            <FontAwesome color={colors.PRIMARY} size={30} name="bolt" />
          </View>
          <View>
            <Text style={{ color: colors.PRIMARY }} variant="titleLarge">
              37
            </Text>
            <Text variant="bodySmall" style={{ color: colors.PRIMARY }}>
              Collections Added
            </Text>
          </View>
        </View>
        <Divider horizontalInset={true} />
        <View
          style={[
            tw`flex-row items-center justify-between`,
            { color: colors.PRIMARY },
          ]}
        >
          <View style={[tw`mr-2`]}>
            <FontAwesome5 color={colors.PRIMARY} size={30} name="clock" />
          </View>
          <View>
            <Text style={{ color: colors.PRIMARY }} variant="titleLarge">
              122+
            </Text>
            <Text variant="bodySmall" style={{ color: colors.PRIMARY }}>
              Hours Spent
            </Text>
          </View>
        </View>
      </Surface>
      <Chart />
      <View style={[tw`mb-500`]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
});

export default Stats;
