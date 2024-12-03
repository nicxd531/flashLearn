import { StyleSheet } from "react-native";
import colors from "./Colors";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    padding: 16,
  },
  header: {
    fontSize: 40,
    fontWeight: "700",
  },
  pillButton: {
    padding: 10,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // Shadow for depth
    shadowOffset: { width: 0, height: 5 }, // Position of shadow
    shadowOpacity: 0.3, // Shadow transparency
    shadowRadius: 8, // Blurriness of shadow
    elevation: 10, // Shadow on Android
  },
  textLink: {
    color: colors.PRIMARY,
    fontSize: 18,
    fontWeight: "500",
  },
  descriptionText: {
    fontSize: 18,
    marginTop: 20,
    color: colors.GRAY,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  pillButtonSmall: {
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextSmall: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
    marginBottom: 10,
  },
  block: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
});
