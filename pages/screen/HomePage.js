import { width } from "@fortawesome/free-solid-svg-icons/faVideo";
import React, { useState, useCallback, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  BackHandler,
  Alert,
} from "react-native";

function HomePage({ navigation }) {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit?", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  function QuitApp() {
    Alert.alert("Exit?", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        marginHorizontal: 16,
        marginVertical: 50,
      }}
    >
      <TouchableHighlight
        onPress={() => navigation.navigate("Menu")}
        activeOpacity={1}
        underlayColor="#0077F6"
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#077FFF",
          marginTop: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            padding: 13,
            fontWeight: "bold",
            fontSize: 14,
            color: "white",
          }}
        >
          START
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          QuitApp();
        }}
        activeOpacity={1}
        underlayColor="#0077F6"
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#077FFF",
          marginTop: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            padding: 13,
            fontWeight: "bold",
            fontSize: 14,
            color: "white",
          }}
        >
          QUIT
        </Text>
      </TouchableHighlight>
    </View>
  );
}

export default HomePage;
