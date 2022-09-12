import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  Platform,
  StatusBar,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Video, AVPlaybackStatus, Audio } from "expo-av";
import User from "../../services/User";

function VideoCall({ navigation, name, pageScreen }) {
  const [type, setType] = useState(CameraType.front);
  const [videoSourceClick, setVideoSourceClick] = useState(null);
  const [status, setStatus] = useState({});
  const video = useRef(null);

  useEffect(() => {
    let item_video = name;

    let videoRef = User["videos"]["person"][item_video];

    setVideoSourceClick(videoRef);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={videoSourceClick}
        fullscreen={true}
        resizeMode="cover"
        isLooping
        shouldPlay
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          height: "100%",
          width: "100%",
        }}
      >
        <View style={styles.box_beside_camera}></View>
        <Camera style={styles.box_camera} type={CameraType.front}></Camera>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.box}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 50 }}
            source={User["images"]["buttons"]["camera_rotate_button"]}
          />
        </View>
        <View style={styles.box}>
          <TouchableOpacity
            onPress={() => {
              pageScreen == "About"
                ? navigation.navigate("About", { pictureName: name })
                : navigation.navigate("Menu");
            }}
          >
            <Image
              style={{ width: 60, height: 60, borderRadius: 50 }}
              source={User["images"]["buttons"]["reject_button"]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 50 }}
            source={User["images"]["buttons"]["mute_button"]}
          />
        </View>
      </View>
    </View>
  );
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
  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: "auto",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "black",
  },
  box: {
    flexGrow: 1,
    width: "32%",
    margin: 2,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  box_beside_camera: {
    flexGrow: 1,
    width: "71%",
    height: "18%",
    justifyContent: "center",
    alignItems: "center",
  },
  box_camera: {
    flexGrow: 1,
    width: "23%",
    margin: 10,
    height: "18%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VideoCall;
