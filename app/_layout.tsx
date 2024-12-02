import { Stack } from "expo-router";
import React from "react";

const Layout: React.FC = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hides the header for all screens
      }}
    />
  );
};

export default Layout;
