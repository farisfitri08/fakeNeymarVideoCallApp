import { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons/faVideo";
import { faMessage } from "@fortawesome/free-solid-svg-icons/faMessage";
import User from "../../services/User";

function AboutPage({ pictureName, navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: (props) => (
        <AboutPageTitle pictureName={pictureName} navigation={navigation} />
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image
          style={{ width: "100%", height: "100%", borderRadius: 25 }}
          resizeMode="contain"
          source={User["images"]["person"][pictureName]}
        />
      </View>
    </View>
  );
}

function AboutPageTitle({ pictureName, navigation }) {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CameraCall", {
            cameraCallName: pictureName,
            pageScreen: "About",
          })
        }
      >
        <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
          <FontAwesomeIcon icon={faVideo} size={40} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat", { chatName: pictureName })}
      >
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            paddingLeft: 20,
            paddingTop: 6,
          }}
        >
          <FontAwesomeIcon icon={faMessage} size={30} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    flex: 1,
  },
  box: {
    flexGrow: 1,
    width: "32%",
    margin: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
});

export default AboutPage;
