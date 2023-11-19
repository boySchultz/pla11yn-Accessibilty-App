import { View, StyleSheet, FlatList, Text, ScrollView } from "react-native";
import React, { MutableRefObject, useState } from "react";
import { WebView } from "react-native-webview";
import { SettingsTile } from "./components/SettingsTile";
import {
  visualPresentationConfig,
  cognitiveLoadConfig,
} from "./settingsConfig";
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
  const CollapsibleWrapper = ({ children, title }: CollapsibleWrapperProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
      setIsCollapsed((prevCollapsed) => !prevCollapsed);
    };
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton
            icon={isCollapsed ? "chevron-down" : "chevron-up"}
            size={40}
            onPress={toggleCollapse}
            role={"button"}
            aria-label={"Öffne oder schließe eine Accessibility Kategorie"}
          />
          <Text onPress={toggleCollapse} style={theme.ally.text}>
            {title}
          </Text>
        </View>
        {!isCollapsed && children}
      </View>
    );
  };

  const renderSettings = ({ item }: any) => {
    return (
      <View style={styles.tileContainer}>
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
    <ScrollView nestedScrollEnabled={true} style={styles.container}>
      <CollapsibleWrapper title={"Cognitive Load"}>
        <FlatList
          scrollEnabled={false}
          data={cognitiveLoadConfig}
          numColumns={2}
          renderItem={renderSettings}
          columnWrapperStyle={styles.row}
        />
      </CollapsibleWrapper>

      <CollapsibleWrapper title={"Visual Representation"}>
        <FlatList
          scrollEnabled={false}
          data={visualPresentationConfig}
          numColumns={2}
          renderItem={renderSettings}
          columnWrapperStyle={styles.row}
        />
      </CollapsibleWrapper>
    </ScrollView>
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
  tileContainer: {
    flex: 1,
    margin: 8,
    minWidth: 96, // Set minimum width of each item to 96 for Target Size (Level AAA)
    minHeight: 96, // Set minimum width of each item to 96 for Target Size (Level AAA)
  },
});
