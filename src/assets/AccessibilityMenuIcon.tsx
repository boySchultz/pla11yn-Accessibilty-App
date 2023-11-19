import Svg, { Path } from "react-native-svg";
import React from "react";
import theme from "../../theme";

interface AllyIcon {
  menuOpen: boolean;
}

export const AccessibilityMenuIcon = ({ menuOpen }: AllyIcon) => {
  return (
    <Svg
      width="40"
      height="40"
      fill={menuOpen ? theme.colors.secondary : theme.colors.background}
      stroke={theme.colors.secondary}
      viewBox="0 100 996 996"
    >
      <Path
        d="M480.053 326.666q-31.053 0-53.22-22.113-22.166-22.114-22.166-53.167t22.113-53.219Q448.894 176 479.947 176t53.22 22.114q22.166 22.113 22.166 53.166 0 31.053-22.113 53.22-22.114 22.166-53.167 22.166ZM368.667 976V447.333q-65.334-5-128.334-14.333-63-9.334-120.333-23.667l16.667-66.666q82.666 20.333 168 29.166Q390 380.667 480 380.667t175.333-8.834q85.334-8.833 168-29.166L840 409.333Q782.667 423.666 719.667 433q-63 9.333-128.334 14.416V976h-66.666V722.666h-89.334V976h-66.666Z"
        strokeWidth="36"
      />
    </Svg>
  );
};
