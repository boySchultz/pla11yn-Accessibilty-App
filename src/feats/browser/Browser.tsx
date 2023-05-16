import React, { useState, useRef } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { Animated, StyleSheet, View, StatusBar } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { SearchBar } from "./SearchBar";
import { AllySettings } from "../settings/AllySettings";
import theme from "../../../theme";
import { SettingsState } from "../../store/StoreTypes";
import { useAllyStore } from "../../store/allyStore";
import { isSameWebsite } from "./utils/urlHelpers";
import { applyAllSettingsToWebView } from "./utils/allyHelpers";

const Browser = () => {
	const { writeSetting, getAllSettings, getSettingByKey } = useAllyStore();
	const [url, setUrl] = useState("https://www.sv-kampen.de/");
	const [showSettings, setShowSettings] = useState(false);
	const webViewRef = useRef<WebView | null>(null);
	//region drawer animation
	const bottomDrawerAnim = useRef(new Animated.Value(0)).current;
	const openDrawer = () => {
		Animated.timing(bottomDrawerAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: false,
		}).start();
		setShowSettings(true);
	};

	const closeDrawer = () => {
		Animated.timing(bottomDrawerAnim, {
			toValue: 0,
			duration: 500,
			useNativeDriver: false,
		}).start(() => setShowSettings(false));
	};
	//endregion
	const handleMessage = (event: WebViewMessageEvent) => {
		const eventState = JSON.parse(
			event.nativeEvent.data
		) as Partial<SettingsState>;
		writeSetting({
			initialValue: eventState.initialValue,
			settingsKey: eventState.settingsKey,
		});
	};

	return (
		<>
			{/*Searchbar*/}
			<StatusBar barStyle="light-content"/>

			<Appbar.Header dark={false} style={{ backgroundColor: theme.colors.secondary, }}>
				<Appbar.Action icon="menu" onPress={showSettings ? closeDrawer : openDrawer}/>
				<SearchBar setUrl={setUrl} url={url}/>
			</Appbar.Header>

			{/*WebView*/}
			<WebView
				ref={webViewRef}
				source={{ uri: url }}
				onMessage={(event) => handleMessage(event)}
				onLoadEnd={(navState) => {
					if (isSameWebsite(url, navState.nativeEvent.url)) {
						applyAllSettingsToWebView(
							webViewRef,
							getAllSettings,
							getSettingByKey
						);
					}
					setUrl(navState.nativeEvent.url);
				}}
			/>
			{/*Settings*/}
			{showSettings && (
				<Animated.View
					style={[
						styles.drawer,
						{
							transform: [
								{
									translateY: bottomDrawerAnim.interpolate({
										inputRange: [0, 1],
										outputRange: [500, 0],
									}),
								},
							],
						},
					]}
				>
					<AllySettings webViewRef={webViewRef}/>
					<View style={{ padding: 16 }}>
						<Button mode={'outlined'} onPress={closeDrawer}>Close Menu</Button>
					</View>
				</Animated.View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	drawer: {
		color: theme.colors.primary,
		backgroundColor: theme.colors.secondary,
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 500,
	},
});
export default Browser;
