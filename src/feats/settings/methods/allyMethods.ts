import { WebView } from "react-native-webview";
import React from "react";
import { SettingsState } from "../../../store/StoreTypes";


//region TEXT PRESENTATION
// SC 1.4.12:Text Spacing (Level AA)
// Line height (line spacing) to at least 1.5 times the font size;
// Spacing following paragraphs to at least 2 times the font size;
// Letter spacing (tracking) to at least 0.12 times the font size;
// Word spacing to at least 0.16 times the font size.


// Success Criterion 1.4.8 Visual Presentation (Level AAA)

// For the visual presentation of blocks of text, a mechanism is available to achieve the following:
// 	(Foreground and background colors can be selected by the user.)
// 	(Width is no more than 80 characters or glyphs (40 if CJK).)
// Text is not justified (aligned to both the left and the right margins).
// Line spacing (leading) is at least space-and-a-half within paragraphs, and paragraph spacing is at least 1.5 times larger than the line spacing.
// 	Text can be resized without assistive technology up to 200 percent in a way that does not require the user to scroll horizontally to read a line of text on a full-screen window.



	export const setLineHeight = (
	ref: React.MutableRefObject<WebView | null>,
	getSettingsState: (
		searchSetting: Partial<SettingsState>
	) => SettingsState | undefined
) => {
		const settingsState = getSettingsState({ settingsKey: "setWordSpacing" });
	console.log("changeRowHeight");
};

export const setLetterSpacing = (
	ref: React.MutableRefObject<WebView | null>,
	amount: number
) => {
	ref.current?.injectJavaScript(`
      var body = document.body;
      var currentSpacing = parseFloat(window.getComputedStyle(body).letterSpacing);
      body.style.letterSpacing = (currentSpacing + ${amount}) + 'px';
    `);
};

export const setWordSpacing = (
	ref: React.MutableRefObject<WebView | null>,
	getSettingsState: (
		searchSetting: Partial<SettingsState>
	) => SettingsState | undefined
) => {
	const settingsState = getSettingsState({ settingsKey: "setWordSpacing" });
	if (settingsState?.initialValue === undefined) {
		ref.current?.injectJavaScript(`
		  var body = document.body;
			var wordSpacingRem = (parseFloat(window.getComputedStyle(body).wordSpacing) / parseFloat(window.getComputedStyle(body).fontSize));
      window.ReactNativeWebView.postMessage(JSON.stringify({settingsKey:'setWordSpacing', initialValue: wordSpacingRem}));
      body.style.wordSpacing = '0.16rem';
    `);
	} else {
		const wordSpacing = (steps: number) => {
			switch (steps) {
				case 0:
					return settingsState.initialValue;
				case 1:
					return 0.16;
				case 2:
					return 0.32;
				case 3:
					return 0.40;
			}
		};
		ref.current?.injectJavaScript(`
      var body = document.body;
      body.style.wordSpacing = '${wordSpacing(settingsState.activeStep)}rem';
    `);
	}
};

//endregion


	export const setFontSize = (
	ref: React.MutableRefObject<WebView | null>,
	getSettingsState: (
		searchSetting: Partial<SettingsState>
	) => SettingsState | undefined
) => {
	const state = getSettingsState({ settingsKey: "setFontSize" });
	ref.current?.injectJavaScript(`
      var body = document.body;
      var currentFontSize = parseFloat(window.getComputedStyle(body).fontSize);
      body.style.fontSize = (currentFontSize + ${state?.activeStep}) + 'px';
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

// export const changeTextJustification = (
//   ref: React.MutableRefObject<WebView | null>,
//   amount: number
// ) => {
//   console.log("changeTextJustification");
// };

//endregion
