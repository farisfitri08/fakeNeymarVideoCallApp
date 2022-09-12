import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Button,
  Text,
  Animated,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "../../services/User";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../../redux/actions";

export default function Chat({ navigation, textName }) {
  const [messages, setMessages] = useState([]);
  const [nowOnlineStatus, setNowOnlineStatus] = useState("Online");
  const { name } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  var autoMessages = require("../../services/autoChat.json");

  async function load() {
    var messageString = JSON.stringify(messages);
    if (messages.length != 0) {
      await AsyncStorage.setItem(textName, messageString);
      var resultText = {};
      messages.map((userMessage, userKey) => {
        if (userKey == 0) {
          name[textName] = userMessage.text;
        }
      });
      resultText = name;
      dispatch(setName(resultText));
    }
  }

  async function checkMessageStorage() {
    const oldMessage = await AsyncStorage.getItem(textName);
    var oldMessageJson = JSON.parse(oldMessage);

    if (oldMessage != null) {
      return oldMessageJson;
    }

    return null;
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => <LogoTitle {...props} textName={textName} />,
    });
    (async () => load())();
  }, []);

  useEffect(() => {
    var newMessage = [];

    checkMessageStorage().then((checkMessage) => {
      if (checkMessage != null) {
        newMessage = checkMessage;
      }

      setMessages(newMessage);
    });
  }, []);

  useEffect(() => {
    var sizeMessages = Object.keys(messages).length;
    if (sizeMessages > 0) {
      var lastMessage = messages[0];

      var nowOnlineStatus = "Online";
      if ("chat" in lastMessage) {
        nowOnlineStatus = "Typing...";
      }

      setNowOnlineStatus(nowOnlineStatus);
      navigation.setOptions({
        headerTitle: (props) => <LogoTitle {...props} textName={textName} />,
      });
      (async () => load())();
    }
  }, [messages, textName]);

  function LogoTitle({ e, textName }) {
    const pictureNameString = textName.split("_");
    let noPicture = pictureNameString[1];
    if (!noPicture) noPicture = 1;
    let pictureRef = User["images"]["person"][textName];

    return (
      <View style={styles.box}>
        <View>
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 }}
            source={pictureRef}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text style={{ paddingLeft: 10, fontWeight: "bold", fontSize: 15 }}>
            {User["person"]["full_name"]} {noPicture}
          </Text>
          <Text style={{ paddingLeft: 10, color: "gray", fontSize: 11 }}>
            {nowOnlineStatus}
          </Text>
        </View>
      </View>
    );
  }

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    load(messages);
    autoBot();
  }, []);

  const autoBot = useCallback((messages = []) => {
    setTimeout(() => {
      var dt = new Date().getTime();
      var newId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );

      var countJson = Object.keys(autoMessages).length;
      var randomNoJson = Math.floor(Math.random() * countJson);
      var randonJsonValue = autoMessages[randomNoJson];

      var autoMessagesString = JSON.stringify(randonJsonValue);

      const pictureNameStringSplit = textName.split("_");
      let noPicture = pictureNameStringSplit[1];
      if (!noPicture) noPicture = 1;
      let pictureRef = User["images"]["person"][textName];

      var parsedString = autoMessagesString.replace(
        /@\{(\w+)\}/g,
        function (match, group) {
          if (group === "currentdate") {
            return new Date();
          } else if (group === "id") {
            return newId;
          }
        }
      );

      var autoMessage = JSON.parse(parsedString);

      autoMessage["user"]["avatar"] = pictureRef;

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, autoMessage)
      );

      load(autoMessage);
    }, 3000);
  }, []);

  const styles = StyleSheet.create({
    box: {
      display: "flex",
      flexDirection: "row",
    },
  });

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}
