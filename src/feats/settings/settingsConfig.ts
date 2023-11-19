import {
  setWordSpacing,
  setLineHeight,
  setParagraphHeight,
  setLetterSpacing,
  setFontSize,
  setTextAlignment,
  AllyMethodParameters,
  setImageVisibility,
  setLinkHighlight, setButtonHighlight,
} from "./methods/allyMethods";

export type SettingsKey =
  | "setLinkHighlight"
  | "setButtonHighlight"
  | "setImageVisibility"
  | "setWordSpacing"
  | "setFontSize"
  | "setLineHeight"
  | "setLetterSpacing"
  | "setParagraphHeight"
  | "setTextAlignment"
  | "setImageContrast";

export interface AllySetting {
  settingsKey: SettingsKey;
  allyMethod: (params: AllyMethodParameters) => void;
  title: string;
  steps: number;
}

export const cognitiveLoadConfig: AllySetting[] = [
  {
    settingsKey: "setLinkHighlight",
    allyMethod: setLinkHighlight,
    title: "Links Hervorheben",
    steps: 2,
  },
  {
    settingsKey: "setButtonHighlight",
    allyMethod: setButtonHighlight,
    title: "Klickbare Felder Hervorheben",
    steps: 2,
  },
  {
    settingsKey: "setImageVisibility",
    allyMethod: setImageVisibility,
    title: "Bilder Vergergen",
    steps: 1,
  },
];

export const visualPresentationConfig: AllySetting[] = [
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
