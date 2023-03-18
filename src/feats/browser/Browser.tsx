import React, { useState, useRef } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Appbar,
  Button,
  Drawer,
  TextInput,
  useTheme,
} from "react-native-paper";
import theme from "../../../theme";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Animated } from "react-native";
const Browser = () => {
  const theme = useTheme();
  const [url, setUrl] = useState("https://www.sv-kampen.de/");
  const [inputText, setInputText] = useState(url);
  const [showMenu, setShowMenu] = useState(false);

  const bottomDrawerAnim = useRef(new Animated.Value(0)).current;

  const handleSearch = (searchText: string) => {
    if (isValidURL(searchText)) {
      if (!searchText.match(/^https?:\/\//i)) {
        searchText = `https://www.${searchText}`;
      }
      setUrl(searchText);
    } else {
      const searchQuery = encodeURIComponent(searchText);
      setUrl(`https://www.google.com/search?q=${searchQuery}`);
    }
  };

  const isValidURL = (url: string) => {
    const pattern =
      /^(https?:\/\/)?([a-z0-9]+\.)?[a-z0-9]+\.[a-z]{2,}(\/.*)?$/i;
    return pattern.test(url);
  };

  const openDrawer = () => {
    Animated.timing(bottomDrawerAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setShowMenu(true);
  };

  const closeDrawer = () => {
    Animated.timing(bottomDrawerAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setShowMenu(false));
  };

  return (
    <>
      <Appbar.Header>
        <TouchableOpacity onPress={showMenu ? closeDrawer : openDrawer}>
          <Appbar.Action icon="menu" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search or enter URL"
          value={inputText}
          onChangeText={(change) => setInputText(change)}
        />
        <Button
          mode={"text"}
          buttonColor={theme.colors.secondary}
          onPress={() => handleSearch(inputText)}
        >
          Search
        </Button>
      </Appbar.Header>
      <WebView source={{ uri: url }} />
      {showMenu && (
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [
                {
                  translateY: bottomDrawerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [200, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <DrawerContentScrollView>
            <Drawer.Section>
              <DrawerItem
                label="Increase font size"
                onPress={() => console.log("Increasing font size")}
                labelStyle={{ color: theme.colors.primary }}
              />
              <DrawerItem
                label="Decrease font size"
                onPress={() => console.log("Decreasing font size")}
                labelStyle={{ color: theme.colors.primary }}
              />
            </Drawer.Section>
          </DrawerContentScrollView>
          <View style={{ padding: 16 }}>
            <Button onPress={closeDrawer}>Close Menu</Button>
          </View>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  drawer: {
    color: theme.colors.primary,
    backgroundColor: theme.colors.secondary,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 400,
  },
  input: {
    backgroundColor: theme.colors.background,
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  webview: {
    flex: 1,
    marginTop: 0,
  },
});

export default Browser;
