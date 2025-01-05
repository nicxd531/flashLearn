import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Card, Text } from "react-native-paper";

const favorites = [
  {
    id: 1,
    name: "Favorite 1",
    description: "Description for favorite 1",
    poster: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Favorite 2",
    description: "Description for favorite 2",
    poster: "https://via.placeholder.com/100",
  },
  // Add more favorites as needed
];

const { width } = Dimensions.get("window");

const Favorites = () => {
  const renderItem = ({
    item,
  }: {
    item: { id: number; name: string; description: string; poster: string };
  }) => (
    <Card style={styles.item}>
      <Image source={{ uri: item.poster }} style={styles.poster} />
      <Card.Content style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText} variant="titleLarge">
          Favorites
        </Text>
      </View>
      <Carousel
        data={favorites}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.8}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={0.7}
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textContainer: {
    width: "100%",
    padding: 16,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  poster: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

export default Favorites;
