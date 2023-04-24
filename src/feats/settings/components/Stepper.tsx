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
        icon={({ size, color }) => (
          <MaterialCommunityIcons
            name="chevron-left"
            size={size}
            color={color}
          />
        )}
        onPress={() => onBack()}
        disabled={activeStep === 0}
      />
      {Array.from({ length: steps }, (_, index) => (
        <View
          key={index}
          style={[
            styles.circle,
            index == steps - 1 && styles.lastCircle,
            index + 1 === activeStep && styles.activeCircle,
          ]}
        />
      ))}
      <IconButton
        icon={({ size, color }) => (
          <MaterialCommunityIcons
            name="chevron-right"
            size={size}
            color={color}
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
    backgroundColor: theme.colors.background,
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
    marginRight: 4,
  },
  lastCircle:{marginRight:0},
  activeCircle: {
    backgroundColor: "#000",
  },
});
