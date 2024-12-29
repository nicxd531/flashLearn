import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { Surface, Card, Avatar } from "react-native-paper";

type Creator = {
  id: string;
  name: string;
  avatar: string;
};

const creators: Creator[] = [
  { id: "1", name: "John Doe", avatar: "https://via.placeholder.com/150" },
  { id: "2", name: "Jane Smith", avatar: "https://via.placeholder.com/150" },
  { id: "3", name: "Mark Johnson", avatar: "https://via.placeholder.com/150" },
  { id: "4", name: "Mark Johnson", avatar: "https://via.placeholder.com/150" },
  { id: "5", name: "Mark Johnson", avatar: "https://via.placeholder.com/150" },
];

const TopCreators: React.FC = () => {
  const renderItem = ({ item }: { item: Creator }) => (
    <Surface style={styles.surface}>
      <Card style={styles.card}>
        <Card.Cover
          style={styles.backgroundOverlay}
          source={{ uri: "https://via.placeholder.com/300x100" }}
        />
        <View style={styles.avatarContainer}>
          <Avatar.Image size={60} source={{ uri: item.avatar }} />
        </View>
        <Card.Content style={{ marginTop: 10 }}>
          <Text style={styles.name}>{item.name}</Text>
        </Card.Content>
      </Card>
    </Surface>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Creators</Text>
      <FlatList
        data={creators}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "bold",
  },
  surface: {
    marginBottom: 10,
    marginRight: 10,
    elevation: 4, // Add elevation to match Card's shadow
    borderRadius: 8, // Match the Card's border radius if needed
    overflow: "hidden", // Ensure content does not overflow
  },
  card: {
    position: "relative",
    width: 112.5, // 25% smaller than 150
    height: 150, // Set a fixed height to match the content
    borderRadius: 8, // Match the Surface's border radius if needed
  },
  backgroundOverlay: {
    height: 75, // 25% smaller than 100
    borderBottomLeftRadius: 0, // Remove bottom left border radius
    borderBottomRightRadius: 0, // Remove bottom right border radius
  },
  avatarContainer: {
    position: "absolute",
    top: 30, // Adjusted for smaller size
    left: "50%",
    transform: [{ translateX: -30 }], // Adjusted for smaller size
  },
  name: {
    marginTop: 12, // Adjusted for smaller size
    fontSize: 13.5, // 25% smaller than 18
    textAlign: "center",
  },
});

export default TopCreators;
