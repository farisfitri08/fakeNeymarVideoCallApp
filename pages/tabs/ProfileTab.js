import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import User from "../../services/User";

function ProfileTab({ navigation }) {
  const profileDisplay = Object.entries(User["images"]["person"]).map(
    ([key, value]) => {
      const pictureNameString = key.split("_");
      let noPicture = pictureNameString[1];
      if (!noPicture) noPicture = 1;
      return (
        <View style={styles.box} key={key}>
          <TouchableOpacity
            onPress={() => navigation.navigate("About", { pictureName: key })}
          >
            <View style={styles.column}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 50 }}
                source={User["images"]["person"][key]}
              />
              <Text style={{ fontSize: 14 }}>
                {User["person"]["short_name"]} {noPicture}
              </Text>
              <Text style={{ color: "gray", fontSize: 10 }}>Active Now</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  );

  return <View style={styles.container}>{profileDisplay}</View>;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 1,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  box: {
    order: 5,
    width: "32%",
    margin: 2,
    height: 130,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileTab;
