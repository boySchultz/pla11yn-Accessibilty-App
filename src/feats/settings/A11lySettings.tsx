import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { DrawerItem } from "@react-navigation/drawer";
import React, { MutableRefObject } from "react";
import { changeZoom, setWordSpacing, setLetterSpacing, setParagraphSpacing, setLineHeight, } from "./a11yMethods";
import { WebView } from "react-native-webview";

interface A11lySettingsProps {
  webViewRef: MutableRefObject<WebView | null>;
}
export const A11lySettings = ({ webViewRef }: A11lySettingsProps) => {
  const theme = useTheme();
  return (
    <>
      <View>
        <DrawerItem
          label="setWordSpacing"
          onPress={() => setWordSpacing(webViewRef)}
          labelStyle={{ color: theme.colors.primary }}
        />
        <DrawerItem
          label="setLetterSpacing"
          onPress={() => setLetterSpacing(webViewRef)}
          labelStyle={{ color: theme.colors.primary }}
        />
        <DrawerItem
          label="setParagraphSpacing"
          onPress={() => setParagraphSpacing(webViewRef)}
          labelStyle={{ color: theme.colors.primary }}
        />
        <DrawerItem
          label="setLineHeight"
          onPress={() => setLineHeight(webViewRef)}
          labelStyle={{ color: theme.colors.primary }}
        />
        <DrawerItem
          label="CHANGE ZOOM"
          onPress={() => changeZoom(webViewRef, 0.1)}
          labelStyle={{ color: theme.colors.primary }}
        />
      </View>
    </>
  );
};
