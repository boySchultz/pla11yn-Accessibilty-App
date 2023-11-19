import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../../../theme";

interface StepperProps {
  activeStep: number;
  steps: number;
  onBack: () => void;
  onNext: () => void;
}

export const Stepper = ({
  steps,
  activeStep,
  onBack,
  onNext,
}: StepperProps) => {
  return (
    <View style={styles.container}>
      <IconButton
        role={'button'}
        aria-label={'Accessibilty Option eine Stufe verringern'}
        icon={({ size, color }) => (
          <MaterialCommunityIcons
            name="chevron-left"
            size={size}
            color={activeStep === 0 ? theme.colors.background : color}
          />
        )}
        onPress={() => onBack()}
        disabled={activeStep === 0}
      />
      <View style={styles.dots}>
        {Array.from({ length: steps }, (_, index) => (
          <View
            role={'contentinfo'}
            aria-label={`Dieses Settings ist auf Stufe ${index+1} von ${steps}`}
            key={index}
            style={[
              styles.circle,
              index + 1 === activeStep && styles.activeCircle,
            ]}
          />
        ))}
      </View>
      <IconButton
        role={"button"}
        aria-label={'Accessibilty Option eine Stufe erhöhen'}
        icon={({ size, color }) => (
          <MaterialCommunityIcons
            name="chevron-right"
            size={size}
            color={activeStep === steps ? theme.colors.background : color}
          />
        )}
        onPress={() => onNext()}
        disabled={activeStep === steps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  dots: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
  },
  activeCircle: {
    backgroundColor: "#000",
  },
});
