import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons/faVideo";
import { faMessage } from "@fortawesome/free-solid-svg-icons/faMessage";
import User from "../../services/User";

function ContactsTab({ navigation }) {
  const contactsDisplay = Object.entries(User["images"]["person"]).map(
    ([key, value]) => {
      const pictureNameString = key.split("_");
      let noPicture = pictureNameString[1];
      if (!noPicture) noPicture = 1;
      return (
        <View style={styles.row} key={key}>
          <View
            style={{
              width: "30%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 50, height: 50, borderRadius: 50 }}
              source={User["images"]["person"][key]}
            />
          </View>
          <View style={{ width: "40%" }}>
            <Text style={{ fontSize: 14, paddingBottom: 10 }}>
              {User["person"]["short_name"]} {noPicture}
            </Text>
            <Text style={{ color: "gray", fontSize: 11 }}>+44 7911 123456</Text>
          </View>
          <View
            style={{
              width: "15%",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: 10,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CameraCall", { cameraCallName: key })
              }
            >
              <FontAwesomeIcon icon={faVideo} size={40} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "15%",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              padding: 5,
              marginTop: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Chat", { chatName: key })}
            >
              <FontAwesomeIcon icon={faMessage} size={30} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  );
  return <View style={styles.container}>{contactsDisplay}</View>;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    height: 100,
    alignItems: "center",
    borderBottomColor: "#D9D9DA",
    borderBottomWidth: 1,
  },
});

export default ContactsTab;
