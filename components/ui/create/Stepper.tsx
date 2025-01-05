import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

interface Props {}

const Stepper: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <ProgressSteps>
        <ProgressStep label="First Step">
          <View style={styles.stepContent}>
            <Text>This is the content within step 1!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Second Step">
          <View style={styles.stepContent}>
            <Text>This is the content within step 2!</Text>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Third Step"
          onNext={() => console.log("Next step")}
          onPrevious={() => console.log("Previous step")}
        >
          <View style={styles.stepContent}>
            <Text>This is the content within step 3!</Text>
            <Button title="Next" onPress={() => console.log("Next step")} />
          </View>
        </ProgressStep>
        <ProgressStep
          label="Fourth Step"
          onNext={() => console.log("Next step")}
          onPrevious={() => console.log("Previous step")}
        >
          <View style={styles.stepContent}>
            <Text>This is the content within step 4!</Text>
            <Button title="Next" onPress={() => console.log("Next step")} />
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  stepContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Stepper;
