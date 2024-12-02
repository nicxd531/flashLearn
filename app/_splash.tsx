import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

const SplashScreen: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulate loading or initialization logic
    const timeout = setTimeout(() => {
      router.replace("/IntroPage"); // Navigate to the main screen or auth flow
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [router]);

  return <SplashScreen />;
};

const styles = StyleSheet.create({});

export default SplashScreen;
