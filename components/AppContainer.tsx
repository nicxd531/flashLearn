import { FC } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { GestureHandlerRootView } from "react-native-gesture-handler";
interface Props {
  children: React.ReactNode;
}

const AppContainer: FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <Toasts
          overrideDarkMode={true}
          globalAnimationType="spring"
          globalAnimationConfig={{
            duration: 1000,
            flingPositionReturnDuration: 200,
            stiffness: 50,
          }}
        />
        {children}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default AppContainer;
