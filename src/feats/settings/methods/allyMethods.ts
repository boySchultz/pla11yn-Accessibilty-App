import { WebView } from "react-native-webview";
import React from "react";
import { SettingsState } from "../../../store/StoreTypes";
import theme from "../../../../theme";

export interface AllyMethodParameters {
  ref: React.MutableRefObject<WebView | null>;
  getSettingsState: (
    searchSetting: Partial<SettingsState>
  ) => SettingsState | undefined;
  step?: number;
}

//region TEXT PRESENTATION
// AC 1.4.12:Text Spacing (Level AA)
// Line height (line spacing) to at least 1.5 times the font size; V
// Spacing following paragraphs to at least 2 times the font size; V
// Letter spacing (tracking) to at least 0.12 times the font size; V
// Word spacing to at least 0.16 times the font size. V

// Success Criterion 1.4.8 Visual Presentation (Level AAA)
// For the visual presentation of blocks of text, a mechanism is available to achieve the following:
// (Foreground and background colors can be selected by the user.)
// X not implemented! (Width is no more than 80 characters or glyphs (40 if CJK).)
// Text is not justified (aligned to both the left and the right margins) V .
// Line spacing (leading) is at least space-and-a-half within paragraphs, and paragraph spacing is at least 1.5 times larger than the line spacing.
// Text can be resized without assistive technology up to 200 percent in a way that does not require the user to scroll horizontally to read a line of text on a full-screen window V.

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

//region IMAGE(OF TEXT)CONTRAST
export const setImageContrast = ({
  ref,
  step,
  getSettingsState,
}: AllyMethodParameters) => {
  const settingsState = getSettingsState({ settingsKey: "setImageContrast" });

  if (settingsState?.initialValue === undefined) {
    ref.current?.injectJavaScript(`
      window.ReactNativeWebView.postMessage(JSON.stringify({ settingsKey: 'setImageContrast', initialValue: 'none' }));
    `);

    if (step !== 0) {
      ref.current?.injectJavaScript(`
        let allImages = document.querySelectorAll('img');
        allImages.forEach((img) => {
          img.style.filter = 'contrast(150%)';
        });
		  `);
    }
  } else {
    const contrastValue = (steps: number) => {
      switch (steps) {
        case 0:
          return "none"; // Filter zurücksetzen, wenn step 0 ist
        case 1:
          return "contrast(150%)";
        case 2:
          return "contrast(300%)";
        case 3:
          return "invert(200%)";
        default:
          return "none";
      }
    };

    ref.current?.injectJavaScript(`
    var images = document.querySelectorAll('img');
    images.forEach((img) => {
      let newFilter = '${contrastValue(step ?? settingsState.activeStep)}';
      img.style.filter = newFilter;
    });
  `);
  }
};

//endregion

//region COGNITIVE LOAD
// enable or disable images
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

// this is a combination of helping to identify interaction elements by highlighting them and the following ACs:
// Success Criterion 1.4.3 Contrast (enhanced) as the elements will conform to contrast specs after applying these styles
//Success Criterion 1.4.8 Visual Presentation: colours can not be directly selected but a selection of 2 different styles of high contrast
// colours are available.
// Providing something like a colour picker could be problematic itself so I went for 2 set colours instead.
export const setButtonHighlight = ({
  ref,
  step,
  getSettingsState,
}: AllyMethodParameters) => {
  const settingsState = getSettingsState({ settingsKey: "setButtonHighlight" });

  if (settingsState?.initialValue === undefined) {
    ref.current?.injectJavaScript(`
      var firstButton = document.querySelector('button');
			var buttonBackgroundColor = window.getComputedStyle(firstButton).backgroundColor;
			var buttonColor = window.getComputedStyle(firstButton).color;
			window.ReactNativeWebView.postMessage(JSON.stringify({ settingsKey: 'setButtonHighlight', initialValue: { backgroundColor: buttonBackgroundColor, color: buttonColor }}));
			`);
    if (step !== 0) {
      ref.current?.injectJavaScript(`
        const buttons = document.querySelectorAll('button');
        buttons.forEach((button) => {
            button.style.backgroundColor = '${theme.colors.secondary}';
            button.style.color = '${theme.colors.primary}';
          }
        );
		  `);
    }
  } else {
    const buttonStyle = (steps: number) => {
      const initialValue = JSON.parse(
        JSON.stringify(settingsState.initialValue)
      );
      switch (steps) {
        case 0:
          return `button.style.backgroundColor = '${initialValue.backgroundColor}'; button.style.color = '${initialValue.color}'`;
        case 1:
          return `button.style.backgroundColor = '${theme.colors.secondary}'; button.style.color = '${theme.colors.primary}'`;
        case 2:
          return `button.style.backgroundColor = '${theme.colors.primary}'; button.style.color = '${theme.colors.secondary}'`;
        default:
          return `button.style.backgroundColor = '${initialValue.backgroundColor}'; button.style.color = '${initialValue.color}'`;
      }
    };
    ref.current?.injectJavaScript(`
		    buttons.forEach((button) => {
		       ${buttonStyle(step ?? settingsState.activeStep)}
		      }
		    );
		`);
  }
};

// this is a combination of helping to identify interaction elements by highlighting them and the following ACs:
// Success Criterion 1.4.3 Contrast (enhanced) as the elements will conform to contrast specs after applying these styles
//Success Criterion 1.4.8 Visual Presentation: colours can not be directly selected but a selection of 2 different styles of high contrast
// colours are available.
// Providing something like a colour picker could be problematic itself so I went for 2 set colours instead.
export const setLinkHighlight = ({
  ref,
  step,
  getSettingsState,
}: AllyMethodParameters) => {
  const settingsState = getSettingsState({ settingsKey: "setLinkHighlight" });

  if (settingsState?.initialValue === undefined) {
    ref.current?.injectJavaScript(`
      var firstLink = document.querySelector('a');
			var linkBackgroundColor = window.getComputedStyle(firstLink).backgroundColor;
			var linkColor = window.getComputedStyle(firstLink).color;
			window.ReactNativeWebView.postMessage(JSON.stringify({ settingsKey: 'setLinkHighlight', initialValue: { backgroundColor: linkBackgroundColor, color: linkColor }}));
			`);
    if (step !== 0) {
      ref.current?.injectJavaScript(`
        const links = document.querySelectorAll('a');
        links.forEach((link) => {
            link.style.backgroundColor = '${theme.colors.secondary}';
            link.style.color = '${theme.colors.primary}';
          }
        );
		  `);
    }
  } else {
    const linkStyle = (steps: number) => {
      const initialValue = JSON.parse(
        JSON.stringify(settingsState.initialValue)
      );
      switch (steps) {
        case 0:
          return `link.style.backgroundColor = '${initialValue.backgroundColor}'; link.style.color = '${initialValue.color}'`;
        case 1:
          return `link.style.backgroundColor = '${theme.colors.secondary}'; link.style.color = '${theme.colors.primary}'`;
        case 2:
          return `link.style.backgroundColor = '${theme.colors.primary}'; link.style.color = '${theme.colors.secondary}'`;
        default:
          return `link.style.backgroundColor = '${initialValue.backgroundColor}'; link.style.color = '${initialValue.color}'`;
      }
    };
    ref.current?.injectJavaScript(`
        const links = document.querySelectorAll('a');
		    links.forEach((link) => {
		       ${linkStyle(step ?? settingsState.activeStep)}
		      }
		    );
		`);
  }
};
//endregion
