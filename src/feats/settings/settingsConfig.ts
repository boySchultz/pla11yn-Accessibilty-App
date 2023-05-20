import {
  setWordSpacing,
  setLineHeight,
  setParagraphHeight,
  setLetterSpacing,
  setFontSize,
  setTextAlignment,
  AllyMethodParameters,
} from "./methods/allyMethods";

export type SettingsKey =
  | "setWordSpacing"
  | "setFontSize"
  | "setLineHeight"
  | "setLetterSpacing"
  | "setParagraphHeight"
  | "setTextAlignment";

export interface AllySetting {
  settingsKey: SettingsKey;
  allyMethod: (params: AllyMethodParameters) => void;
  title: string;
  steps: number;
}

export const settingsConfig: AllySetting[] = [
  {
    settingsKey: "setTextAlignment",
    allyMethod: setTextAlignment,
    title: "Text Alignment",
    steps: 3,
  },
  {
    settingsKey: "setFontSize",
    allyMethod: setFontSize,
    title: "Font Size",
    steps: 3,
  },
  {
    settingsKey: "setLineHeight",
    allyMethod: setLineHeight,
    title: "Line Height",
    steps: 2,
  },
  {
    settingsKey: "setParagraphHeight",
    allyMethod: setParagraphHeight,
    title: "Paragraph Height",
    steps: 2,
  },
  {
    settingsKey: "setLetterSpacing",
    allyMethod: setLetterSpacing,
    title: "Letter Spacing",
    steps: 3,
  },
  {
    settingsKey: "setWordSpacing",
    allyMethod: setWordSpacing,
    title: "Word Spacing",
    steps: 3,
  },
];
