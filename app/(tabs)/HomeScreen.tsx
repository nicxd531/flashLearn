import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  GestureResponderEvent,
} from "react-native";
import TopCreators from "@/components/ui/home/TopCreators";
import PillToggleButton from "@/components/ui/home/PillToggleButton";
import DiscoverScreen from "@/components/ui/home/screens/DiscoverScreen";
import ExploreScreen from "@/components/ui/home/screens/ExploreScreen";
import TopAppBar from "@/components/ui/home/TopAppBar";
import { Modalize } from "react-native-modalize";
import FeedsModal from "@/components/ui/home/FeedsModal";

const HomeScreen: React.FC = () => {
  const modalizeRef = useRef<Modalize>(null);
  const onOpen = (event: GestureResponderEvent) => {
    event.persist(); // Prevent React from reusing the event object
    modalizeRef.current?.open();
  };
  const [activeScreen, setActiveScreen] = useState<"Explore" | "Discover">(
    "Explore"
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar />
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
        {activeScreen === "Explore" ? (
          <ExploreScreen />
        ) : (
          <DiscoverScreen onOpen={onOpen} />
        )}
        <FeedsModal modalizeRef={modalizeRef} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flex: 1,
  },
});

export default HomeScreen;
