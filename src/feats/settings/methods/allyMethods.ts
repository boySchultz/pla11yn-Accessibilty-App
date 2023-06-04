import { WebView } from "react-native-webview";
import React from "react";
import { SettingsState } from "../../../store/StoreTypes";

export interface AllyMethodParameters {
  ref: React.MutableRefObject<WebView | null>;
  getSettingsState: (
    searchSetting: Partial<SettingsState>
  ) => SettingsState | undefined;
  step?: number;
}

//region TEXT PRESENTATION
// SC 1.4.12:Text Spacing (Level AA)
// Line height (line spacing) to at least 1.5 times the font size; V
// Spacing following paragraphs to at least 2 times the font size; V
// Letter spacing (tracking) to at least 0.12 times the font size; V
// Word spacing to at least 0.16 times the font size. V

// Success Criterion 1.4.8 Visual Presentation (Level AAA)
// For the visual presentation of blocks of text, a mechanism is available to achieve the following:
// (Foreground and background colors can be selected by the user.)
// (Width is no more than 80 characters or glyphs (40 if CJK).)
// Text is not justified (aligned to both the left and the right margins).
// Line spacing (leading) is at least space-and-a-half within paragraphs, and paragraph spacing is at least 1.5 times larger than the line spacing.
// Text can be resized without assistive technology up to 200 percent in a way that does not require the user to scroll horizontally to read a line of text on a full-screen window.

export const setLineHeight = ({
  ref,
  step,
  getSettingsState,
}: AllyMethodParameters) => {
  const settingsState = getSettingsState({ settingsKey: "setLineHeight" });
  if (settingsState?.initialValue === undefined) {
    ref.current?.injectJavaScript(`
			var body = document.body;
			var lineHeight = (parseFloat(window.getComputedStyle(body).lineHeight) / parseFloat(window.getComputedStyle(body).fontSize)).toFixed(2);
			window.ReactNativeWebView.postMessage(JSON.stringify({ settingsKey: 'setLineHeight', initialValue: lineHeight }));
		`);
    if (step !== 0) {
      ref.current?.injectJavaScript(`
        body.style.lineHeight = '1.5em'; // lineSpacing(1)
		`);
    }
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
    ref.current?.injectJavaScript(
      `document.body.style.lineHeight = '${lineSpacing(
        step ?? settingsState.activeStep
      )}em';`
    );
  }
};

export const setParagraphHeight = ({
  ref,
  step,
  getSettingsState,
}: AllyMethodParameters) => {
  const settingsState = getSettingsState({ settingsKey: "setParagraphHeight" });
  if (settingsState?.initialValue === undefined) {
    ref.current?.injectJavaScript(`
			var body = document.body;
			var firstParagraph = document.querySelector('p') || 0;
			var paragraphHeight = ( parseFloat(window.getComputedStyle(firstParagraph).getPropertyValue('margin-bottom')) / parseFloat(window.getComputedStyle(body).fontSize) ).toFixed(2);
	
			window.ReactNativeWebView.postMessage(JSON.stringify({
				settingsKey: 'setParagraphHeight',
				initialValue: paragraphHeight
			}));
		`);
    if (step !== 0) {
      ref.current?.injectJavaScript(`
				var lineHeight15 = ( parseFloat(window.getComputedStyle(body).lineHeight) / parseFloat(window.getComputedStyle(body).fontSize) ).toFixed(2) * 1.5;
				var paragraphs = document.querySelectorAll('p');
				// 1.4.8(AAA): paragraph spacing is at least 1.5 times larger than the line spacing.
				if (lineHeight15 > 2) {
					paragraphs.forEach((p) => {
						p.style.marginBottom = lineHeight15 + 'em';
					});
				} else {
					paragraphs.forEach((p) => {
						p.style.marginBottom = '2em';
					});
				}
			`);
    }
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
			var body = document.body;
			var paragraphs = document.querySelectorAll('p');
			var lineHeight15 = ( parseFloat(window.getComputedStyle(body).lineHeight) / parseFloat(window.getComputedStyle(body).fontSize) ).toFixed(2) * 1.5;

			// 1.4.8(AAA): paragraph spacing is at least 1.5 times larger than the line spacing.
			if (${
        settingsState.activeStep
      } !==0  && ${step} !== 0 && lineHeight15 > ${paragraphHeight(
      settingsState.activeStep
    )}) {
				paragraphs.forEach((p) => {
					p.style.marginBottom = lineHeight15 + 'em';
				});
			}	else {
				paragraphs.forEach((p) => {
					p.style.marginBottom = '${paragraphHeight(step ?? settingsState.activeStep)}em';
				});
			}
			`);
  }
};
export const setLetterSpacing = ({
  ref,
  step,
  getSettingsState,
}: AllyMethodParameters) => {
  const settingsState = getSettingsState({ settingsKey: "setLetterSpacing" });
  if (settingsState?.initialValue === undefined) {
    ref.current?.injectJavaScript(`
			var body = document.body;
			var bodyStyles = window.getComputedStyle(body);
			if (bodyStyles.letterSpacing === 'normal') {
				window.ReactNativeWebView.postMessage(JSON.stringify({
					settingsKey: 'setLetterSpacing',
					initialValue: bodyStyles.letterSpacing
				}));
			} else {
				window.ReactNativeWebView.postMessage(JSON.stringify({
					settingsKey: 'setLetterSpacing',
					initialValue: bodyStyles.letterSpacing / bodyStyles.fontSize
				}));
			}`);
    if (step !== 0) {
      ref.current?.injectJavaScript(`
			body.style.letterSpacing = '0.12em'; //letterSpacing(1)
			`);
    }
  } else {
    const letterSpacing = (steps: number) => {
      switch (steps) {
        case 0:
          return settingsState.initialValue;
        case 1:
          return "0.12em";
        case 2:
          return "0.16em";
        case 3:
          return "0.20em";
        default:
          return settingsState.initialValue;
      }
    };
    ref.current?.injectJavaScript(
      `document.body.style.letterSpacing = '${letterSpacing(
        step ?? settingsState.activeStep
      )}';`
    );
  }
};

export const setWordSpacing = ({
  ref,
  step,
  getSettingsState,
}: AllyMethodParameters) => {
  const settingsState = getSettingsState({ settingsKey: "setWordSpacing" });
  if (settingsState?.initialValue === undefined) {
    ref.current?.injectJavaScript(`
			var body = document.body;
			var wordSpacing = ( parseFloat(window.getComputedStyle(body).wordSpacing) / parseFloat(window.getComputedStyle(body).fontSize) ).toFixed(2);
			window.ReactNativeWebView.postMessage(JSON.stringify({ settingsKey: 'setWordSpacing', initialValue: wordSpacing }));
		`);
    if (step !== 0) {
      ref.current?.injectJavaScript(`
     		body.style.wordSpacing = '0.16em'; //wordSpacing(1);
		`);
    }
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
          return 0.4;
        default:
          return settingsState.initialValue;
      }
    };
    ref.current?.injectJavaScript(
      `document.body.style.wordSpacing = '${wordSpacing(
        step ?? settingsState.activeStep
      )}em';`
    );
  }
};

export const setFontSize = ({
  ref,
  step,
  getSettingsState,
}: AllyMethodParameters) => {
  const settingsState = getSettingsState({ settingsKey: "setFontSize" });
  if (settingsState?.initialValue === undefined) {
    ref.current?.injectJavaScript(`
			var fontSize = parseFloat(window.getComputedStyle(document.body).fontSize);
			window.ReactNativeWebView.postMessage(JSON.stringify({ settingsKey: 'setFontSize', initialValue: fontSize }));
			`);
    if (step !== 0) {
      ref.current?.injectJavaScript(`
			document.body.style.fontSize = fontSize * 1.33 + 'px'; //wordSpacing(1);
			`);
    }
  } else {
    const fontSize = (steps: number) => {
      switch (steps) {
        case 0:
          return settingsState.initialValue;
        case 1:
          return parseFloat(settingsState.initialValue.toString()) * 1.33;
        case 2:
          return parseFloat(settingsState.initialValue.toString()) * 1.66;
        case 3:
          return parseFloat(settingsState.initialValue.toString()) * 2;
        default:
          return settingsState.initialValue;
      }
    };
    ref.current?.injectJavaScript(
      `document.body.style.fontSize = '${fontSize(
        step ?? settingsState.activeStep
      )}' + 'px';`
    );
  }
};

export const setTextAlignment = ({
  ref,
  step,
  getSettingsState,
}: AllyMethodParameters) => {
  const settingsState = getSettingsState({ settingsKey: "setTextAlignment" });

  if (settingsState?.initialValue === undefined) {
    ref.current?.injectJavaScript(`
				var textAlignment = window.getComputedStyle(document.body).textAlign;
				window.ReactNativeWebView.postMessage(JSON.stringify({
					settingsKey: 'setTextAlignment',
					initialValue: textAlignment
				}));
				`);
    if (step !== 0) {
      ref.current?.injectJavaScript(`
					var textAlignment = window.getComputedStyle(document.body).textAlign;
					if (textAlignment === 'start') {
						document.body.style.textAlign = 'center'; //textAlignment(1);
					} else {
						document.body.style.textAlign = 'start'; //textAlignment(1);
					}
				`);
    }
  } else {
    const alignments = ["start", "center", "end", "justify"].filter(
      (a) => a !== settingsState?.initialValue
    );
    const textAlignment = (steps: number) => {
      switch (steps) {
        case 0:
          return settingsState.initialValue;
        case 1:
          return alignments[0];
        case 2:
          return alignments[1];
        case 3:
          return alignments[2];
        default:
          return settingsState.initialValue;
      }
    };
    ref.current?.injectJavaScript(
      `document.body.style.textAlign = '${textAlignment(
        step ?? settingsState.activeStep
      )}';`
    );
  }
};
//endregion

//region cognitive load
export const setImageVisibility = ({
  ref,
  step,
  getSettingsState,
}: AllyMethodParameters) => {
  const settingsState = getSettingsState({ settingsKey: "setImageVisibility" });
  const getVisibility = () => {
    return Boolean(step ?? settingsState?.activeStep) ? "collapse" : "visible";
  };

  ref.current?.injectJavaScript(`
			document.querySelectorAll('img').forEach((img) => img.style.visibility = '${getVisibility()}');
		`);
};

export const setLinkHighlight = ({
  ref,
  step,
  getSettingsState,
}: AllyMethodParameters) => {
  const settingsState = getSettingsState({ settingsKey: "setLinkHighlight" });

  if (step ?? settingsState?.activeStep) {
    ref.current?.injectJavaScript(`
		const links = document.querySelectorAll('a');
		links.forEach((link) => {
				link.style.backgroundColor = 'yellow';
				link.style.color = 'black';
			}
		);
		`);
  } else {
    ref.current?.injectJavaScript(`
		const links = document.querySelectorAll('a');
		links.forEach((link) => {
				link.style.backgroundColor = '';
				link.style.color = '';
			}
		);
		`);
  }
};
//endregion
