import {
  cognitiveLoadConfig,
  visualPresentationConfig,
} from "../../settings/settingsConfig";
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
    [...cognitiveLoadConfig, ...visualPresentationConfig]
      .find((sc) => sc.settingsKey === setting.settingsKey)
      ?.allyMethod({ ref: webViewRef, getSettingsState: getSettingByKey })
  );
};

export const disableSettings = (
  webViewRef: React.MutableRefObject<WebView | null>,
  getAllSettings: () => SettingsState[],
  getSettingByKey: (
    searchSetting: Partial<SettingsState>
  ) => SettingsState | undefined,
  step: number
) => {
  if (!webViewRef) return;
  getAllSettings().forEach((setting) =>
    [...cognitiveLoadConfig, ...visualPresentationConfig]
      .find((sc) => sc.settingsKey === setting.settingsKey)
      ?.allyMethod({
        ref: webViewRef,
        getSettingsState: getSettingByKey,
        step: step,
      })
  );
};

export const resetAllInitialSettingsValues = (
  webViewRef: React.MutableRefObject<WebView | null>,
  getAllSettings: () => SettingsState[],
  writeSetting: (setting: Partial<SettingsState>) => void
) => {
  if (!webViewRef) return;
  getAllSettings().forEach((setting) => {
    writeSetting({ settingsKey: setting.settingsKey, initialValue: undefined });
  });
};
