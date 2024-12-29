import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import TopCreators from "@/components/ui/home/TopCreators";
import PillToggleButton from "@/components/ui/home/PillToggleButton";
import DiscoverScreen from "@/components/ui/home/screens/DiscoverScreen";
import ExploreScreen from "@/components/ui/home/screens/ExploreScreen";

const HomeScreen: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<"Explore" | "Discover">(
    "Explore"
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable content */}
      <ScrollView style={styles.scroll}>
        <TopCreators />
        <View>
          <PillToggleButton
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
          />
        </View>
        {/* Add other scrollable components here */}
        {activeScreen === "Explore" ? <ExploreScreen /> : <DiscoverScreen />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
});

export default HomeScreen;
