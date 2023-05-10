import { WebView } from "react-native-webview";
import React from "react";
import { SettingsState } from "../../../store/StoreTypes";

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
  getSettingsState: (
    searchSetting: Partial<SettingsState>
  ) => SettingsState | undefined
) => {
  const settingsState = getSettingsState({ settingsKey: "setWordSpacing" });
  console.log("settings state", settingsState);
  if (settingsState?.initialValue === undefined) {
    console.log("!settingsSate. initial value");
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
          return 0.64;
      }
    };

    console.log("size factor", wordSpacing(settingsState.activeStep));
    ref.current?.injectJavaScript(`
      var body = document.body;
      body.style.wordSpacing = '${wordSpacing(settingsState.activeStep)}rem';
    `);
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
