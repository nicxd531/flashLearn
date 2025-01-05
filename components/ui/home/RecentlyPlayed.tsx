import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Card, Title } from "react-native-paper";

const recentlyPlayed = [
  { id: 1, name: "Collection 1", poster: "https://via.placeholder.com/150" },
  { id: 2, name: "Collection 2", poster: "https://via.placeholder.com/150" },
  { id: 3, name: "Collection 3", poster: "https://via.placeholder.com/150" },
  // Add more collections as needed
];

const { width } = Dimensions.get("window");

const RecentlyPlayed = () => {
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
        <Text style={styles.titleText}>Recently Played</Text>
      </View>
      <Carousel
        data={recentlyPlayed}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.6} // Adjust item width to show multiple items
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        loop={false}
        autoplay={false}
        containerCustomStyle={styles.carouselContainer}
        contentContainerCustomStyle={styles.carouselContentContainer}
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
    marginBottom: 16,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    marginHorizontal: 2, // Add horizontal margin to create space between items
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    width: 200, // Adjust card width to match item width
  },
  poster: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  carouselContainer: {
    overflow: "visible", // Ensure the carousel items are visible
  },
  carouselContentContainer: {
    paddingHorizontal: 1, // Add padding to the content container
  },
  title: {},
});

export default RecentlyPlayed;
