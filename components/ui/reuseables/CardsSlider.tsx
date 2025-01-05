import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";

import { Text } from "react-native-paper";
import Carousel from "react-native-snap-carousel";

interface Props {
  stackStyle: string;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  data: { title: string; image: any }[];
}

const CardsSlider: FC<Props> = (props) => {
  const { stackStyle, currentIndex, setCurrentIndex, data } = props;
  const renderItem = ({ item }: { item: { title: string; image: any } }) => (
    <View style={styles.item}>
      <Image
        style={{ width: 300, height: 400, borderRadius: 8 }}
        source={item.image}
        PlaceholderContent={<ActivityIndicator size={30} />}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        layout={stackStyle === "default" ? "default" : "stack"}
        data={data}
        renderItem={renderItem}
        sliderWidth={400}
        itemWidth={300}
        loop={true}
        autoplayInterval={3000}
        onSnapToItem={(index) => setCurrentIndex(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardsSlider;
