import {
	setWordSpacing,
	setLineHeight,
	setParagraphHeight,
	setLetterSpacing,
	setFontSize
} from './methods/allyMethods';
import React from 'react';
import { WebView } from 'react-native-webview';
import { SettingsState } from '../../store/StoreTypes';

export type SettingsKey =
	'setWordSpacing'
	| 'setFontSize'
	| 'setLineHeight'
	| 'setLetterSpacing'
	| 'setParagraphHeight';

export interface AllySetting {
	settingsKey: SettingsKey;
	onPress: (
		ref: React.MutableRefObject<WebView | null>,
		getSettingsState: (
			searchSetting: Partial<SettingsState>
		) => SettingsState | undefined
	) => void;
	title: string;
	steps: number;
}

export const settingsConfig: AllySetting[] = [
	{
		settingsKey: 'setFontSize',
		onPress: setFontSize,
		title: 'Font Size',
		steps: 3,
	},
	{
		settingsKey: 'setLineHeight',
		onPress: setLineHeight,
		title: 'Line Height',
		steps: 2,
	},
	{
		settingsKey: 'setParagraphHeight',
		onPress: setParagraphHeight,
		title: 'Paragraph Height',
		steps: 2,
	},
	{
		settingsKey: 'setLetterSpacing',
		onPress: setLetterSpacing,
		title: 'Letter Spacing',
		steps: 3,
	},
	{
		settingsKey: 'setWordSpacing',
		onPress: setWordSpacing,
		title: 'Word Spacing',
		steps: 3,
	},
];
