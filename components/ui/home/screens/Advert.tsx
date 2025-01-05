import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";

const advert1 = require("../../../../assets/images/advert1.jpg");
const advert2 = require("../../../../assets/images/advert2.jpg");
const advert3 = require("../../../../assets/images/advert3.jpg");

const data = [
  { title: "Item 1", image: advert1 },
  { title: "Item 2", image: advert2 },
  { title: "Item 3", image: advert3 },
];

interface Props {}

const Advert: FC<Props> = (props) => {
  const renderItem = ({ item }: { item: { title: string; image: any } }) => (
    <View style={styles.item}>
      <Image
        style={{ width: 300, height: 200, borderRadius: 8 }}
        source={item.image}
        PlaceholderContent={<ActivityIndicator />}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={500}
        itemWidth={300}
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Advert;
