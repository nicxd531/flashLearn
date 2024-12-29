import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Card, Text, Title } from "react-native-paper";
import Carousel from "react-native-snap-carousel";

const favorites = [
  { id: 1, name: "Collection 1", poster: "https://via.placeholder.com/150" },
  { id: 2, name: "Collection 2", poster: "https://via.placeholder.com/150" },
  { id: 3, name: "Collection 3", poster: "https://via.placeholder.com/150" },
  // Add more collections as needed
];

const { width } = Dimensions.get("window");

const Favorite = () => {
  const renderItem = ({
    item,
  }: {
    item: { id: number; name: string; poster: string };
  }) => (
    <Card key={item.id} style={styles.card}>
      <Image source={{ uri: item.poster }} style={styles.poster} />
      <Card.Content>
        <Title style={styles.title}>{item.name}</Title>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>Favorite</Text>
      </View>
      <Carousel
        data={favorites}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={160} // Width of card + margin
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        loop={true}
        autoplayInterval={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    width: "100%",
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  card: {
    width: 150,
    marginRight: 10,
  },
  poster: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Favorite;
