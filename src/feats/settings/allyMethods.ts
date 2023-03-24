import { WebView } from "react-native-webview";
import React from "react";

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
