import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

interface Props {}

const Chart: FC<Props> = (props) => {
  const data = [
    { value: 10, label: "Jan", frontColor: "#4ABFF4" },
    { value: 5, label: "Feb", frontColor: "#79C3DB" },
    { value: 15, label: "Mar", frontColor: "#28B2B3" },
    { value: 30, label: "Apr", frontColor: "#4ADDBA" },
    { value: 3, label: "May", frontColor: "#91E3E3" },
  ];
  return (
    <View>
      <BarChart
        data={data}
        barWidth={45}
        cappedBars
        capColor={"rgba(78, 0, 142)"}
        capThickness={4}
        showGradient
        gradientColor={"rgba(200, 100, 244,0.8)"}
        frontColor={"rgba(219, 182, 249,0.2)"}
        isAnimated
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Chart;
