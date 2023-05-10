import {
	setWordSpacing,
	setFontSize,
	setLineHeight,
	setParagraphHeight,
	setLetterSpacing
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
		settingsKey: 'setLineHeight',
		onPress: setLineHeight,
		title: 'LineHeight',
		steps: 2,
	},
	{
		settingsKey: 'setParagraphHeight',
		onPress: setParagraphHeight,
		title: 'ParagraphHeight',
		steps: 3,
	},
	{
		settingsKey: 'setLetterSpacing',
		onPress: setLetterSpacing,
		title: 'LetterSpacing',
		steps: 3,
	},
	{
		settingsKey: 'setWordSpacing',
		onPress: setWordSpacing,
		title: 'WordSpacing',
		steps: 3,
	},
];
