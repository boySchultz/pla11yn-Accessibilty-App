import { setWordSpacing, setFontSize } from "./methods/a11yMethods";
import React from "react";
import { WebView } from "react-native-webview";
import { SettingsState } from "../../store/StoreTypes";

export type SettingsKey = "setWordSpacing" | "setFontSize";

export interface AllySetting {
  settingsKey: SettingsKey;
  onPress: (
    ref: React.MutableRefObject<WebView | null>,
    getSettingsState: (
      searchSetting: Partial<SettingsState>
    ) => SettingsState | undefined
  ) => void;
  title: string;
  steps: number;
}

export const settingsConfig: AllySetting[] = [
  {
    settingsKey: "setWordSpacing",
    onPress: setWordSpacing,
    title: "setWordSpacing",
    steps: 3,
  },
  {
    settingsKey: "setFontSize",
    onPress: setFontSize,
    title: "setFontSize",
    steps: 3,
  },
  // {
  //   settingsKey: "3",
  //   onPress: setWordSpacing,
  //   title: "setWordSpacing",
  //   steps: 2,
  // },
  // {
  //   settingsKey: "4",
  //   onPress: setWordSpacing,
  //   title: "setWordSpacing",
  //   steps: 3,
  // },
];
