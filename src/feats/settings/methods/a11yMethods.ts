import { WebView } from "react-native-webview";
import React from "react";
import { SettingsState } from "../../../store/StoreTypes";

export const setFontSize = (
	ref: React.MutableRefObject<WebView | null>,
	settingsState: SettingsState | undefined,
) => {
	ref.current?.injectJavaScript(`
      var body = document.body;
      var currentFontSize = parseFloat(window.getComputedStyle(body).fontSize);
      body.style.fontSize = (currentFontSize + ${settingsState?.activeStep}) + 'px';
    `);
};

// export const changeZoom = (
//   ref: React.MutableRefObject<WebView | null>,
//   amount: number
// ) => {
//   ref.current?.injectJavaScript(`
//       var body = document.body;
//       var currentZoom = parseFloat(window.getComputedStyle(body).zoom);
//       body.style.zoom = (currentZoom + ${amount});
//     `);
// };
//
// export const changeRowHeight = (
//   ref: React.MutableRefObject<WebView | null>,
//   amount: number
// ) => {
//   console.log("changeRowHeight");
// };
//
// export const changeFontSpacing = (
//   ref: React.MutableRefObject<WebView | null>,
//   amount: number
// ) => {
//   ref.current?.injectJavaScript(`
//       var body = document.body;
//       var currentSpacing = parseFloat(window.getComputedStyle(body).letterSpacing);
//       body.style.letterSpacing = (currentSpacing + ${amount}) + 'px';
//     `);
// };
//
// export const changeTextJustification = (
//   ref: React.MutableRefObject<WebView | null>,
//   amount: number
// ) => {
//   console.log("changeTextJustification");
// };
//region SC 1.4.12:Text Spacing (Level AA)
// Word spacing to at least 0.16 times the font size:
//sets min values according to wcag AA for text spacing
export const setWordSpacing = (
	ref: React.MutableRefObject<WebView | null>,
	settingsState: SettingsState | undefined
) => {
	console.log('active step', settingsState?.activeStep);
	if (settingsState?.initialValue === undefined) {
		console.log('!settingsSate');
		ref.current?.injectJavaScript(`
      var body = document.body;
      var currentFontSize = parseFloat(window.getComputedStyle(body).wordSpacing);
      window.ReactNativeWebView.postMessage(JSON.stringify({settingsKey:'setWordSpacing', initialValue: currentFontSize}));
      body.style.wordSpacing = (0.16 * currentFontSize) + 'px';
    `);
	} else {
		if (settingsState?.activeStep === 0) {
			console.log('activeStep===0');
			ref.current?.injectJavaScript(`
      var body = document.body;
      var fontSize = parseFloat(window.getComputedStyle(body).fontSize);
      body.style.wordSpacing = ${settingsState.initialValue} + 'px';
    `);
		} else {
			const sizeFactor = (steps: number) => {
				switch (steps) {
					case 1:
						return 0.16;
					case 2:
						return 0.3;
					case 3:
						return 0.8;
				}
			};
			ref.current?.injectJavaScript(`
      var body = document.body;
      var fontSize = parseFloat(window.getComputedStyle(body).fontSize);
      body.style.wordSpacing = (${sizeFactor(
				settingsState.activeStep
			)} * fontSize) + 'px';
    `);
		}
	}
};

// export const setLetterSpacing = (
//   ref: React.MutableRefObject<WebView | null>,
//   sizeFactor = 0.12
// ) => {
//   // Letter spacing (tracking) to at least 0.12 times the font size
//   ref.current?.injectJavaScript(`
//       var body = document.body;
//       var currentFontSize = parseFloat(window.getComputedStyle(body).fontSize);
//       body.style.letterSpacing = (${sizeFactor} * currentFontSize) + 'px';
//     `);
// };
//
// export const setParagraphSpacing = (
//   ref: React.MutableRefObject<WebView | null>,
//   sizeFactor = 2
// ) => {
//   // Spacing following paragraphs to at least 2 times the font size:
//   ref.current?.injectJavaScript(`
//       var body = document.body;
//       var currentFontSize = parseFloat(window.getComputedStyle(body).fontSize);
//       body.style.marginBottom = (${sizeFactor} * currentFontSize) + 'px';
//     `);
// };
// export const setLineHeight = (
//   ref: React.MutableRefObject<WebView | null>,
//   sizeFactor = 1.5
// ) => {
//   //Line height (line spacing) at least 1.5 times the font size
//   ref.current?.injectJavaScript(`
//       var body = document.body;
//       var currentFontSize = parseFloat(window.getComputedStyle(body).fontSize);
//       body.style.lineHeight = (${sizeFactor} * currentFontSize) + 'px';
//     `);
// };
//endregion
