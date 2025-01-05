import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import tw from "twrnc";
interface Props {}

const UserDetails: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.heading]}>
        <Text style={[tw`font-bold  w-full `]} variant="headlineMedium">
          Info Page
        </Text>
      </View>
      <View style={[tw` flex-row justify-center gap-6`, { width: 300 }]}>
        <View
          style={[
            tw`justify-center items-center `,
            { justifyContent: "centers" },
          ]}
        >
          <Text variant="labelLarge">Collections</Text>
          <Text style={[tw`font-bold text-lg `]}>40</Text>
        </View>
        <View
          style={[
            tw`justify-center items-center `,
            { justifyContent: "centers" },
          ]}
        >
          <Text variant="labelLarge">Followers</Text>
          <Text style={[tw`font-bold text-lg `]}>40K</Text>
        </View>
        <View
          style={[
            tw`justify-center items-center `,
            { justifyContent: "centers" },
          ]}
        >
          <Text variant="labelLarge">Following</Text>
          <Text style={[tw`font-bold text-lg `]}>40K</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => console.log("Follow button pressed")}
        >
          Follow
        </Button>
        <IconButton
          icon="chat-outline"
          size={24}
          onPress={() => console.log("Chat button pressed")}
          style={styles.chatButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {},
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 16,
  },
  chatButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserDetails;
