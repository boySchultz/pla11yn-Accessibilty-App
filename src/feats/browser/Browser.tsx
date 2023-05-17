import React, { useState, useRef } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { Animated, StyleSheet, View, StatusBar } from "react-native";
import { Appbar, Button, IconButton, Text } from "react-native-paper";
import { SearchBar } from "./SearchBar";
import { AllySettings } from "../settings/AllySettings";
import theme from "../../../theme";
import { SettingsState } from "../../store/StoreTypes";
import { useAllyStore } from "../../store/allyStore";
import { isSameWebsite } from "./utils/urlHelpers";
import { applyAllSettingsToWebView } from "./utils/allyHelpers";
import { AccessibilityMenuIconActive } from "../../assets/AccessibilityMenuIcon";

const Browser = () => {
	const { writeSetting, getAllSettings, getSettingByKey } = useAllyStore();
	const [url, setUrl] = useState("https://www.sv-kampen.de/");
	const [showSettings, setShowSettings] = useState(false);
	const [settingsEnabled, setSettingsEnabled] = useState(false);
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
			<StatusBar barStyle="light-content"/>

			{/*Searchbar*/}
			<Appbar.Header style={{ backgroundColor: theme.colors.secondary, }}>
				<IconButton
					selected={showSettings}
					role={'button'}
					accessibilityLabel={'opens and closes accessibility menu'}
					iconColor={theme.colors.secondary}
					style={{ height: 48, width: 48 ,backgroundColor: getAllSettings().filter((s) => s.activeStep !== 0).length ? theme.colors.primary : theme.colors.background }}
					icon={()=><AccessibilityMenuIconActive/>} onPress={showSettings ? closeDrawer : openDrawer}
				/>

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
					<View style={{ flexDirection: 'column', justifyContent:'space-evenly', padding: 18 }}>
						<View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
							<Text style={{color: theme.colors.primary}} variant={'labelLarge'}>
								Enable Ally Settings
							</Text>
							<Button style={{borderWidth: 2}} mode={'outlined'} onPress={closeDrawer}>Close Menu</Button>
						</View>
						<Button style={{borderWidth: 2}} mode={'outlined'} onPress={closeDrawer}>Close Menu</Button>
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
