import React, { useState, useRef } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { TouchableOpacity, Animated, StyleSheet, View } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { SearchBar } from "./SearchBar";
import { AllySettings } from "../settings/AllySettings";
import theme from "../../../theme";
import { SettingsState } from "../../store/StoreTypes";
import { useAllyStore } from "../../store/allyStore";
import { isSameWebsite } from "./utils/urlHelpers";

const Browser = () => {
  const { writeSetting } = useAllyStore();
  const [url, setUrl] = useState("https://www.sv-kampen.de/");
  const [showSettings, setShowSettings] = useState(false);
  const webViewRef = useRef<WebView | null>(null);

  //region drawer animation
  const bottomDrawerAnim = useRef(new Animated.Value(0)).current;
  const openDrawer = () => {
    Animated.timing(bottomDrawerAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setShowSettings(true);
  };

  const closeDrawer = () => {
    Animated.timing(bottomDrawerAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setShowSettings(false));
  };
  //endregion

  //set initial value for settings
  const handleMessage = (event: WebViewMessageEvent) => {
    const eventState = JSON.parse(
      event.nativeEvent.data
    ) as Partial<SettingsState>;
    writeSetting({
      initialValue: eventState.initialValue,
      settingsKey: eventState.settingsKey,
    });
  };

  return (
    <>
      {/*Searchbar*/}
      <Appbar.Header>
        <TouchableOpacity onPress={showSettings ? closeDrawer : openDrawer}>
          <Appbar.Action icon="menu" />
        </TouchableOpacity>
        <SearchBar setUrl={setUrl} url={url} />
      </Appbar.Header>

      {/*WebView*/}
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        onMessage={(event) => handleMessage(event)}
        onNavigationStateChange={(navState)=>console.log('on Navigation change: same website?', isSameWebsite(url,navState.url))}
      />
      {/*Settings*/}
      {showSettings && (
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [
                {
                  translateY: bottomDrawerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [500, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <AllySettings webViewRef={webViewRef} />
          <View style={{ padding: 16 }}>
            <Button onPress={closeDrawer}>Close Menu</Button>
          </View>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  drawer: {
    color: theme.colors.primary,
    backgroundColor: theme.colors.secondary,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 500,
  },
});
export default Browser;
