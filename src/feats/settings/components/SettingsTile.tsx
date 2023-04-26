import React, { useState, MutableRefObject } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Stepper } from "./Stepper";
import { WebView } from "react-native-webview";

interface SettingsTileProps {
  onPress: (ref: MutableRefObject<WebView | null>, sizeFactor?: number) => void;
  webViewRef: React.MutableRefObject<WebView | null>;
  title: string;
  steps: number;
}

export const SettingsTile = ({
  title,
  onPress,
  steps,
  webViewRef,
}: SettingsTileProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    onPress(webViewRef, activeStep);
    setActiveStep(() => {
      return activeStep === steps ? 0 : activeStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((activeStep) => {
      return activeStep === 0 ? 0 : activeStep - 1;
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
    borderRadius: 10, // adjust the value to your liking
  },
  text: {
    padding: 8,
    fontSize: 16, // adjust to your liking
    lineHeight: 24, // adjust to your liking
    letterSpacing: 0.5, // adjust to your liking
  },
});
