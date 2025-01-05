import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";

const SearchScreen: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  const updateSearch = (text: string): void => {
    setSearch(text);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        platform="default" // Specify the platform
        placeholder="Search"
        onChangeText={updateSearch}
        value={search}
        containerStyle={{
          backgroundColor: "transparent",
          borderColor: "transparent",
        }}
        round={true}
        lightTheme={true}
        showLoading={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});

export default SearchScreen;
