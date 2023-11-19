import {
	setWordSpacing,
	setLineHeight,
	setParagraphHeight,
	setLetterSpacing,
	setFontSize,
	setTextAlignment,
	AllyMethodParameters,
	setImageVisibility,
	setLinkHighlight, setButtonHighlight, setImageContrast,
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
		title: "Bilder Verbergen",
		steps: 1,
	},
];

export const visualPresentationConfig: AllySetting[] = [
	{
		settingsKey: 'setImageContrast',
		allyMethod: setImageContrast,
		steps: 3,
		title: 'Kontrast von Bildern'
	},
	{
		settingsKey: "setTextAlignment",
		allyMethod: setTextAlignment,
		title: "Text Ausrichtung",
		steps: 3,
	},
	{
		settingsKey: "setFontSize",
		allyMethod: setFontSize,
		title: "Textgröße",
		steps: 3,
	},
	{
		settingsKey: "setLineHeight",
		allyMethod: setLineHeight,
		title: "Zeilen-Höhe",
		steps: 2,
	},
	{
		settingsKey: "setParagraphHeight",
		allyMethod: setParagraphHeight,
		title: "Absatz-Höhe",
		steps: 2,
	},
	{
		settingsKey: "setLetterSpacing",
		allyMethod: setLetterSpacing,
		title: "Buchstaben-Abstand",
		steps: 3,
	},
	{
		settingsKey: "setWordSpacing",
		allyMethod: setWordSpacing,
		title: "Wörter-Abstand",
		steps: 3,
	},
];
