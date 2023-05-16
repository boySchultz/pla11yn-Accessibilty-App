import { View, StyleSheet, FlatList } from "react-native";
import React, { MutableRefObject } from "react";
import { WebView } from "react-native-webview";
import { SettingsTile } from "./components/SettingsTile";
import { settingsConfig } from "./settingsConfig";
import theme from "../../../theme";

interface AllySettingsProps {
  webViewRef: MutableRefObject<WebView | null>;
}
export const AllySettings = ({ webViewRef }: AllySettingsProps) => {
  const renderSettings = ({ item }: any) => {
    return (
      <View style={styles.itemContainer}>
        <SettingsTile
          webViewRef={webViewRef}
          settingsKey={item.settingsKey}
          allyMethod={item.allyMethod}
          title={item.title}
          steps={item.steps}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsConfig}
        numColumns={2}
        renderItem={renderSettings}
        columnWrapperStyle={styles.row} // Apply styles to each row
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemContainer: {
    flex: 1,
    margin: 8, // Add margin around each item
    minWidth: 96, // Set minimum width of each item to 96 for Target Size (Level AAA)
    minHeight: 96, // Set minimum width of each item to 96 for Target Size (Level AAA)
  },
});
