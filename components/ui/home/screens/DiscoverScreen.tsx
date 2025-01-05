import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Feeds from "../Feeds";

interface Props {}

const data = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/2765586/pexels-photo-2765586.jpeg?dpr=1",
    avatar: "https://example.com/avatar1.jpg",
    name: "John Doe",
    time: "2 hours ago",
    info: "cards for technology ",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/2765586/pexels-photo-2765586.jpeg?dpr=1",
    avatar: "https://example.com/avatar2.jpg",
    name: "Jane Smith",
    time: "3 hours ago",
    info: "cards for technology ",
  },
  // Add more items as needed
];

const DiscoverScreen: React.FC<Props> = (props) => {
  const renderItem = ({ item }: { item: (typeof data)[0] }) => (
    <Feeds
      image={item.image}
      avatar={item.avatar}
      name={item.name}
      info={item.info}
      time={item.time}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  listContent: {
    padding: 16,
  },
});

export default DiscoverScreen;
