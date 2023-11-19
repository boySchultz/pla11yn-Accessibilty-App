import {DefaultTheme} from 'react-native-paper';
import { TextStyle } from "react-native";

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#efc410',
		secondary: '#223046',
		background: '#F5F5F5',
		switchTrackFalse: '#223046B3',
		switchTrackTrue:'#EFC41033'
	},
	// text settings according to wcag guideline 1.4
	ally:{
		text: {
			fontWeight: "bold",
			padding: 8,
			fontSize: 16,
			lineHeight: 24,
			letterSpacing: 1.92,
		} as TextStyle,
	}
};

export default theme;
