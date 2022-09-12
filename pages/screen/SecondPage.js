import React, { useState, useCallback, useEffect } from "react";
import { Button, View, Text, Alert } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileTab from "../../pages/tabs/ProfileTab.js";
import ContactsTab from "../../pages/tabs/ContactsTab.js";
import ChatsTab from "../../pages/tabs/ChatsTab.js";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialTopTabNavigator();

function ListProfileScreen({ navigation }) {
  return <ProfileTab navigation={navigation} />;
}

function ContactsScreen({ navigation }) {
  return <ContactsTab navigation={navigation} />;
}

function ChatsScreen({ navigation }) {
  return <ChatsTab navigation={navigation} />;
}

function SecondPage({ navigation }) {
  const { name, age } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    async function callProduct() {
      const result = {};
      const keys = await AsyncStorage.getAllKeys();
      for (const key of keys) {
        const val = await AsyncStorage.getItem(key);
        result[key] = val;
      }

      var resultText = {};
      for (var newKey of Object.keys(result)) {
        var resultChat = result[newKey];
        JSON.parse(resultChat).map((user, userKey) => {
          if (userKey == 0) {
            resultText[newKey] = user.text;
          }
        });
      }
      dispatch(setName(resultText));
    }

    callProduct();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarIndicatorStyle: {
          backgroundColor: "#077FFF",
        },
        tabBarItemStyle: { borderBottomColor: "#D9D9DA", borderBottomWidth: 1 },
      }}
    >
      <Tab.Screen name="Profile" component={ListProfileScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="Chats" component={ChatsScreen} />
    </Tab.Navigator>
  );
}

export default SecondPage;
