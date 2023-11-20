import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Stepper } from "./Stepper";
import { WebView } from "react-native-webview";
import { useAllyStore } from "../../../store/allyStore";
import { SettingsKey } from "../settingsConfig";
import theme from "../../../../theme";
import { AllyMethodParameters } from "../methods/allyMethods";

interface SettingsTileProps {
  allyMethod: (params: AllyMethodParameters) => void;

  webViewRef: React.MutableRefObject<WebView | null>;
  title: string;
  steps: number;
  settingsKey: SettingsKey;
  settingsEnabled: boolean;
}

export const SettingsTile = ({
  settingsKey,
  title,
  allyMethod,
  steps,
  webViewRef,
  settingsEnabled,
}: SettingsTileProps) => {
  const { getSettingByKey, writeSetting } = useAllyStore();
  const settingsState = getSettingByKey({ settingsKey: settingsKey });
  const activeStep = settingsState?.activeStep ?? 0;
  const handleNext = () => {
    writeSetting({
      settingsKey: settingsKey,
      activeStep: activeStep === steps ? 0 : activeStep + 1,
    });
    allyMethod({
      ref: webViewRef,
      getSettingsState: getSettingByKey,
      step: settingsEnabled ? undefined : 0,
    });
  };

  const handleBack = () => {
    writeSetting({
      settingsKey: settingsKey,
      activeStep: activeStep === 0 ? 0 : activeStep - 1,
    });
    allyMethod({ ref: webViewRef, getSettingsState: getSettingByKey });
  };

  return (
    <TouchableOpacity
      role={"button"}
      aria-label={"Accessibilty Option eine Stufe erhöhen"}
      style={{ ...styles.container, borderWidth: activeStep === 0 ? 2 : 4 }}
      onPress={() => handleNext()}
    >
      <Text style={theme.ally.text}>{title}</Text>
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
});
