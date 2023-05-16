import React from 'react';
import {View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import theme from './theme';
import Browser from "./src/feats/browser/Browser";
import 'react-native-url-polyfill/auto';

export default function App() {
	return (
		<PaperProvider theme={theme}>
			<View style={{flex: 1}}>
				<Browser/>
			</View>
		</PaperProvider>
	);
}
