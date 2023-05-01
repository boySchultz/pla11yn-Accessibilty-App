import { WebView } from "react-native-webview";
import React from "react";

//region text manipulation
export const changeFontSize = (
  ref: React.MutableRefObject<WebView | null>,
  amount: number
) => {
  ref.current?.injectJavaScript(`
      var body = document.body;
      var currentFontSize = parseFloat(window.getComputedStyle(body).fontSize);
      body.style.fontSize = (currentFontSize + ${amount}) + 'px';
    `);
};

export const changeZoom = (
  ref: React.MutableRefObject<WebView | null>,
  amount: number
) => {
  ref.current?.injectJavaScript(`
      var body = document.body;
      var currentZoom = parseFloat(window.getComputedStyle(body).zoom);
      body.style.zoom = (currentZoom + ${amount});
    `);
};

export const changeRowHeight = (
  ref: React.MutableRefObject<WebView | null>,
  amount: number
) => {
  console.log("changeRowHeight");
};

export const changeFontSpacing = (
  ref: React.MutableRefObject<WebView | null>,
  amount: number
) => {
  ref.current?.injectJavaScript(`
      var body = document.body;
      var currentSpacing = parseFloat(window.getComputedStyle(body).letterSpacing);
      console.log(currentSpacing);
      body.style.letterSpacing = (currentSpacing + ${amount}) + 'px';
    `);
};

export const changeTextJustification = (
  ref: React.MutableRefObject<WebView | null>,
  amount: number
) => {
  console.log("changeTextJustification");
};
//endregion

//region SC 1.4.12:Text Spacing (Level AA)
//sets mins according to wcag AA for text spacing
export const setWordSpacing = (
  ref: React.MutableRefObject<WebView | null>,
  steps: number = 0
) => {
  const sizeFactor = (steps: number) => {
    // console.log("steps", steps);
    switch (steps) {
        //todo: remove 0 case and and reset value directly in inject method
      case 0:
        return 0.1;
      case 1:
        return 0.16;
      case 2:
        return 0.3;
      case 3:
        return 0.8;
    }
  };

  const factor = sizeFactor(steps);

  //todo: if (step === 0) else: set wordSpacing to stored Value for wordSpacing

  // Word spacing to at least 0.16 times the font size:
  ref.current?.injectJavaScript(`
      var body = document.body;
      var currentFontSize = parseFloat(window.getComputedStyle(body).fontSize);
      body.style.wordSpacing = (${factor} * currentFontSize) + 'px';
    `);
};

export const setLetterSpacing = (
  ref: React.MutableRefObject<WebView | null>,
  sizeFactor = 0.12
) => {
  // Letter spacing (tracking) to at least 0.12 times the font size
  ref.current?.injectJavaScript(`
      var body = document.body;
      var currentFontSize = parseFloat(window.getComputedStyle(body).fontSize);
      body.style.letterSpacing = (${sizeFactor} * currentFontSize) + 'px';
    `);
};

export const setParagraphSpacing = (
  ref: React.MutableRefObject<WebView | null>,
  sizeFactor = 2
) => {
  // Spacing following paragraphs to at least 2 times the font size:
  ref.current?.injectJavaScript(`
      var body = document.body;
      var currentFontSize = parseFloat(window.getComputedStyle(body).fontSize);
      body.style.marginBottom = (${sizeFactor} * currentFontSize) + 'px';
    `);
};
export const setLineHeight = (
  ref: React.MutableRefObject<WebView | null>,
  sizeFactor = 1.5
) => {
  //Line height (line spacing) at least 1.5 times the font size
  ref.current?.injectJavaScript(`
      var body = document.body;
      var currentFontSize = parseFloat(window.getComputedStyle(body).fontSize);
      body.style.lineHeight = (${sizeFactor} * currentFontSize) + 'px';
    `);
};
//endregion
