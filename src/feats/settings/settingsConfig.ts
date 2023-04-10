import { setWordSpacing } from "./methods/a11yMethods";
import React from "react";
import { WebView } from "react-native-webview";

export interface AllySetting {
	key: string;
	onPress: (
		ref: React.MutableRefObject<WebView | null>,
		steps?: number
	) => void;
	title: string;
	steps: number;
}



export const settingsConfig: AllySetting[] = [
	{
		key: 'setWordSpacing',
		onPress: setWordSpacing,
		title: "setWordSpacing",
		steps: 3,
	},
	{
		key: "2",
		onPress: setWordSpacing,
		title: "setWordSpacing",
		steps: 3,
	},
	{
		key: "3",
		onPress: setWordSpacing,
		title: "setWordSpacing",
		steps: 3,
	},
	{
		key: "4",
		onPress: setWordSpacing,
		title: "setWordSpacing",
		steps: 3,
	},
];
