import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import User from "../../services/User";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../../redux/actions";

function ChatsTab({ navigation, lastMessages }) {
  const { name } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [lastText, setLastText] = useState({});

  const chatsDisplay = Object.entries(User["images"]["person"]).map(
    ([key, value]) => {
      const pictureNameString = key.split("_");
      let noPicture = pictureNameString[1];
      if (!noPicture) noPicture = 1;

      return (
        <View key={key}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Chat", { chatName: key })}
          >
            <View style={styles.row}>
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
              <View style={{ width: "70%" }}>
                <Text style={{ fontSize: 14, paddingBottom: 10 }}>
                  {User["person"]["short_name"]} {noPicture}
                </Text>
                <Text style={{ color: "gray", fontSize: 11 }}>{name[key]}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  );
  return <View style={styles.container}>{chatsDisplay}</View>;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    margin: 2,
    height: 100,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    borderBottomColor: "#D9D9DA",
    borderBottomWidth: 1,
  },
});

export default ChatsTab;
