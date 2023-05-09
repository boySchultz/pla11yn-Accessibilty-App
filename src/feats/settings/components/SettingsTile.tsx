import React, { MutableRefObject } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Stepper } from "./Stepper";
import { WebView } from "react-native-webview";
import { useAllyStore } from "../../../store/allyStore";
import { SettingsState } from "../../../store/StoreTypes";

interface SettingsTileProps {
  onPress: (
    ref: MutableRefObject<WebView | null>,
    settingsState: SettingsState | undefined
  ) => void;
  webViewRef: React.MutableRefObject<WebView | null>;
  title: string;
  steps: number;
  settingsKey: string;
}

export const SettingsTile = ({
  settingsKey,
  title,
  onPress,
  steps,
  webViewRef,
}: SettingsTileProps) => {
  const { getSettingByKey, writeSetting } = useAllyStore();
  const settingsState = getSettingByKey({ settingsKey: settingsKey });
  const activeStep = settingsState?.activeStep ?? 0;
  const handleNext = () => {
    onPress(webViewRef,settingsState);
    writeSetting({
      settingsKey: settingsKey,
      activeStep: activeStep === steps ? 0 : activeStep + 1,
    });
  };

  const handleBack = () => {
    onPress(webViewRef, settingsState);
    writeSetting({
      settingsKey: settingsKey,
      activeStep: activeStep === 0 ? 0 : activeStep - 1,
    });
  };

  return (
    <TouchableOpacity
      style={{ ...styles.container, borderWidth: activeStep === 0 ? 2 : 4 }}
      onPress={() => handleNext()}
    >
      <Text style={styles.text}>{title}</Text>
      <Stepper
        steps={steps}
        activeStep={activeStep}
        onNext={handleNext}
        onBack={handleBack}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: "#000",
    borderRadius: 10,
  },
  text: {
    fontWeight: "bold",
    padding: 8,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.7,
  },
});
