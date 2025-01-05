import Stepper from "@/components/ui/create/Stepper";
import Stepper2 from "@/components/ui/create/Stepper2";
import { FC } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import tw from "twrnc";

interface Props {}

const CreateScreen: FC<Props> = (props) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.heading]}>
          <Text style={[tw`font-bold`]} variant="headlineMedium">
            Create
          </Text>
        </View>
        {/* <Stepper /> */}
        <Stepper2 />
        <View style={{ marginBottom: 100 }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

export default CreateScreen;
