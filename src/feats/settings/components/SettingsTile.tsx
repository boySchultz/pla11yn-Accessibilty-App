import React, { useState, MutableRefObject } from "react";
import { TouchableOpacity, Text } from "react-native";
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
    <TouchableOpacity onPress={() => handleNext()}>
      <Text>{title}</Text>
      <Stepper
        steps={steps}
        activeStep={activeStep}
        onNext={handleNext}
        onBack={handleBack}
      />
    </TouchableOpacity>
  );
};
