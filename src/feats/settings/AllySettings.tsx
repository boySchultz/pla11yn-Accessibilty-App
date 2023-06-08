import { View, StyleSheet, FlatList, Text } from "react-native";
import React, { MutableRefObject, useState } from "react";
import { WebView } from "react-native-webview";
import { SettingsTile } from "./components/SettingsTile";
import { settingsConfig } from "./settingsConfig";
import theme from "../../../theme";
import { IconButton } from "react-native-paper";

interface AllySettingsProps {
  webViewRef: MutableRefObject<WebView | null>;
  settingsEnabled: boolean;
}

interface CollapsibleWrapperProps {
  title: string;
  children: React.ReactNode;
}

export const AllySettings = ({
  webViewRef,
  settingsEnabled,
}: AllySettingsProps) => {

  const CollapsibleWrapper = ({ children, title }:CollapsibleWrapperProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
      setIsCollapsed((prevCollapsed) => !prevCollapsed);
    };

    return (
      <View>
        <IconButton
          icon={isCollapsed ? 'chevron-down' : 'chevron-up'}
          size={40}
          onPress={toggleCollapse}
        />
        <Text style={theme.ally.text}>{title}</Text>
        {!isCollapsed && children}
      </View>
    );
  };

  const renderSettings = ({ item }: any) => {
    return (
      <View style={styles.itemContainer}>
        <SettingsTile
          settingsEnabled={settingsEnabled}
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
      <CollapsibleWrapper title={'Visual Representation'}>
        <FlatList
          data={settingsConfig}
          numColumns={2}
          renderItem={renderSettings}
          columnWrapperStyle={styles.row} // Apply styles to each row
        />
      </CollapsibleWrapper>
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
