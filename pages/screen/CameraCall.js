import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  BackHandler,
  Platform,
  StatusBar,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Video, AVPlaybackStatus, Audio } from "expo-av";
import User from "../../services/User";

function CameraCall({ navigation, cameraCallName, permission, pageScreen }) {
  const [type, setType] = useState(CameraType.front);
  const [sound, setSound] = useState(null);
  const [pictureNumber, setPictureNumber] = useState(null);

  useEffect(() => {
    const pictureNameString = cameraCallName.split("_");
    let noPicture = pictureNameString[1];
    if (!noPicture) noPicture = 1;
    setPictureNumber(noPicture);
  }, []);
  useEffect(() => {
    sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;

    playSound().then((playRingTone) => {
      setSound(playRingTone);
    });
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (sound) {
        sound.stopAsync();
        sound.unloadAsync();
        setSound(null);
      }

      pageScreen == "About"
        ? navigation.navigate("About", { pictureName: cameraCallName })
        : navigation.navigate("Menu");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [sound]);

  return (
    <View style={styles.container}>
      {permission ? (
        <Camera style={styles.camera} type={type}>
          <View
            style={{ display: "flex", alignSelf: "center", paddingTop: 50 }}
          >
            <Image
              style={{ width: 90, height: 90, borderRadius: 50 }}
              source={User["images"]["person"][cameraCallName]}
            />
          </View>
          <View style={{ display: "flex", alignSelf: "center", padding: 9 }}>
            <Text style={{ fontSize: 19, color: "white" }}>
              {User["person"]["full_name"]} {pictureNumber}
            </Text>
          </View>
          <View style={{ display: "flex", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: "white" }}>
              incoming video call
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.box}>
              <TouchableOpacity
                onPress={() => {
                  if (sound) {
                    sound.stopAsync();
                    sound.unloadAsync();
                    setSound(null);
                  }
                  navigation.goBack();
                }}
              >
                <Image
                  style={{ width: 60, height: 60, borderRadius: 50 }}
                  source={User["images"]["buttons"]["reject_button"]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <TouchableOpacity
                onPress={() => {
                  if (sound) {
                    sound.stopAsync();
                    sound.unloadAsync();
                    setSound(null);
                  }
                  navigation.navigate("VideoCall", {
                    videoCallName: cameraCallName,
                    pageScreen: pageScreen,
                  });
                }}
              >
                <Image
                  style={{ width: 60, height: 60, borderRadius: 50 }}
                  source={User["images"]["buttons"]["accept_video_button"]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      ) : (
        <Text>Please Accept Permission to make Video Call</Text>
      )}
    </View>
  );
}

async function playSound() {
  const { sound } = await Audio.Sound.createAsync(
    User["ringtone"]["video_call"]
  );

  await sound.playAsync();
  await sound.setIsLoopingAsync(true);
  return sound;
}

async function removeSoundCall() {
  return sound;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: "auto",
    width: "100%",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  box: {
    flexGrow: 1,
    width: "48%",
    margin: 2,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraCall;
