import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { DrawerItem } from "@react-navigation/drawer";
import React, { MutableRefObject } from "react";
import { changeFontSize } from "./allyMethods";
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
            label="Increase font size"
            onPress={() => changeFontSize(webViewRef, 2)}
            labelStyle={{ color: theme.colors.primary }}
          />
          <DrawerItem
            label="Decrease font size"
            onPress={() => changeFontSize(webViewRef, -2)}
            labelStyle={{ color: theme.colors.primary }}
          />
      </View>
    </>
  );
};
