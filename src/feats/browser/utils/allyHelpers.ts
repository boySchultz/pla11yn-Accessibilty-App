import { settingsConfig } from "../../settings/settingsConfig";
import { SettingsState } from "../../../store/StoreTypes";
import React from "react";
import { WebView } from "react-native-webview";

export const applyAllSettingsToWebView = (
  webViewRef: React.MutableRefObject<WebView | null>,
  getAllSettings: () => SettingsState[],
  getSettingByKey: (
    searchSetting: Partial<SettingsState>
  ) => SettingsState | undefined
) => {
  if (!webViewRef) return;
  getAllSettings().forEach((setting) =>
    settingsConfig
      .find((sc) => sc.settingsKey === setting.settingsKey)
      ?.allyMethod(webViewRef, getSettingByKey)
  );
};
