import { WebView } from "react-native-webview";
import React from "react";
import { SettingsState } from "../../../store/StoreTypes";


//region TEXT PRESENTATION
// SC 1.4.12:Text Spacing (Level AA)
// Line height (line spacing) to at least 1.5 times the font size; V
// Spacing following paragraphs to at least 2 times the font size; V
// Letter spacing (tracking) to at least 0.12 times the font size;
// Word spacing to at least 0.16 times the font size. V


// Success Criterion 1.4.8 Visual Presentation (Level AAA)

// For the visual presentation of blocks of text, a mechanism is available to achieve the following:
// 	(Foreground and background colors can be selected by the user.)
// 	(Width is no more than 80 characters or glyphs (40 if CJK).)
// Text is not justified (aligned to both the left and the right margins).
// Line spacing (leading) is at least space-and-a-half within paragraphs, and paragraph spacing is at least 1.5 times larger than the line spacing.
// Text can be resized without assistive technology up to 200 percent in a way that does not require the user to scroll horizontally to read a line of text on a full-screen window.


export const setLineHeight = (
	ref: React.MutableRefObject<WebView | null>,
	getSettingsState: (
		searchSetting: Partial<SettingsState>
	) => SettingsState | undefined
) => {
	const settingsState = getSettingsState({ settingsKey: 'setLineHeight' });
	if (settingsState?.initialValue === undefined) {
		ref.current?.injectJavaScript(`
		  var body = document.body;
		  var lineHeight = (parseFloat(window.getComputedStyle(body).lineHeight) / parseFloat(window.getComputedStyle(body).fontSize)).toFixed(2);
		  window.ReactNativeWebView.postMessage(JSON.stringify({settingsKey: 'setLineHeight', initialValue: lineHeight}));
      body.style.lineHeight = '1.5em';
		`);
	} else {
		const lineSpacing = (steps: number) => {
			switch (steps) {
				case 0:
					return settingsState.initialValue;
				case 1:
					return 1.5;
				case 2:
					return 1.8;
				default:
					return settingsState.initialValue;
			}
		};
		ref.current?.injectJavaScript(`
      document.body.style.lineHeight = '${lineSpacing(settingsState.activeStep)}em';
    `);
	}
};

export const setParagraphHeight = (
	ref: React.MutableRefObject<WebView | null>,
	getSettingsState: (
		searchSetting: Partial<SettingsState>
	) => SettingsState | undefined
) => {
	const settingsState = getSettingsState({ settingsKey: 'setParagraphHeight' });
	if (settingsState?.initialValue === undefined) {
		ref.current?.injectJavaScript(`
			  var body = document.body;
			  var firstParagraph = document.querySelector('p') || 0;
				var paragraphHeight = (parseFloat(window.getComputedStyle(firstParagraph).getPropertyValue('margin-bottom')) / parseFloat(window.getComputedStyle(body).fontSize)).toFixed(2);
				
		    window.ReactNativeWebView.postMessage(JSON.stringify({settingsKey:'setParagraphHeight', initialValue: paragraphHeight}));
		  
		    var paragraphs = document.querySelectorAll('p');
				paragraphs.forEach((p) => {
          p.style.marginBottom = '2em';
				});
		  `);
	} else {
		const paragraphHeight = (steps: number) => {
			switch (steps) {
				case 0:
					return settingsState.initialValue;
				case 1:
					return 2;
				case 2:
					return 3;
				default:
					return settingsState.initialValue;

			}
		};
		ref.current?.injectJavaScript(`
        var paragraphs = document.querySelectorAll('p');
				paragraphs.forEach((p) => {
          p.style.marginBottom = '${paragraphHeight(settingsState.activeStep)}em';
				});
    `);
	}
};
export const setLetterSpacing = (
	ref: React.MutableRefObject<WebView | null>,
	getSettingsState: (
		searchSetting: Partial<SettingsState>
	) => SettingsState | undefined
) => {
	const settingsState = getSettingsState({ settingsKey: 'setLetterSpacing' });

	const letterSpacing = (steps: number) => {
		switch (steps) {
			case 0:
				return settingsState?.initialValue;
			case 1:
				return '0.12em';
			case 2:
				return '0.16em';
			case 3:
				return '0.20em';
			default:
				return settingsState?.initialValue;
		}
	};
	if (settingsState?.initialValue === undefined) {
		ref.current?.injectJavaScript(`
			var body = document.body;
			var bodyStyles = window.getComputedStyle(body);
			if (bodyStyles.letterSpacing === 'normal') {
				window.ReactNativeWebView.postMessage(JSON.stringify({settingsKey: 'setLetterSpacing', initialValue: bodyStyles.letterSpacing}));
			} else {
					window.ReactNativeWebView.postMessage(JSON.stringify({settingsKey: 'setLetterSpacing', initialValue: bodyStyles.letterSpacing / bodyStyles.fontSize}));
			}
      body.style.letterSpacing = '0.12em';
		  `);
	} else {

		console.log(letterSpacing(settingsState.activeStep));

		ref.current?.injectJavaScript(`
			document.body.style.letterSpacing = '${letterSpacing(settingsState.activeStep)}';
    `);
	}
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
			var wordSpacing = (parseFloat(window.getComputedStyle(body).wordSpacing) / parseFloat(window.getComputedStyle(body).fontSize)).toFixed(2);
      window.ReactNativeWebView.postMessage(JSON.stringify({settingsKey:'setWordSpacing', initialValue: wordSpacing}));
      body.style.wordSpacing = '0.16em';
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
				default:
					return settingsState.initialValue;

			}
		};
		ref.current?.injectJavaScript(`
      document.body.style.wordSpacing = '${wordSpacing(settingsState.activeStep)}em';
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
