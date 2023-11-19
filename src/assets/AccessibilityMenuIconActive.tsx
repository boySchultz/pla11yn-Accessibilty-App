import Svg, { Path } from "react-native-svg";
import React from "react";
import theme from "../../theme";

interface AllyIcon {
  menuOpen: boolean;
}

export const AccessibilityMenuIconActive = ({ menuOpen }: AllyIcon) => {
  return (
    <Svg
      width="40"
      height="40"
      fill={menuOpen ? theme.colors.secondary : theme.colors.background}
      stroke={theme.colors.secondary}
      viewBox="0 70 996 996"
    >
      <Path
        d="M480.08 242q-30.08 0-51.58-21.42-21.5-21.421-21.5-51.5 0-30.08 21.42-51.58Q449.841 96 479.92 96q30.08 0 51.58 21.42 21.5 21.421 21.5 51.5 0 30.08-21.42 51.58-21.421 21.5-51.5 21.5ZM376 856V362q-63-5-127-14.5T130 324l15-60q80 20 164.5 29t170.5 9q86 0 170.5-9T815 264l15 60q-55 14-119 23.5t-127 14.644V856h-60V612h-88v244h-60Zm-59 200q-17 0-27.5-10.5T279 1018q0-17 10.5-27.5T317 980q17 0 27.5 10.5T355 1018q0 17-10.5 27.5T317 1056Zm164 0q-17 0-27.5-10.5T443 1018q0-17 10.5-27.5T481 980q17 0 27.5 10.5T519 1018q0 17-10.5 27.5T481 1056Zm164 0q-17 0-27.5-10.5T607 1018q0-17 10.5-27.5T645 980q17 0 27.5 10.5T683 1018q0 17-10.5 27.5T645 1056Z"
        strokeWidth="36"
      />
    </Svg>
  );
};
