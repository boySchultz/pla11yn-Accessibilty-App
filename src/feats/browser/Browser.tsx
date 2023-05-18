import React, { useState, useRef, useMemo, useEffect } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { Animated, StyleSheet, View, StatusBar, Switch } from "react-native";
import { Appbar, Button, IconButton, Text } from "react-native-paper";
import { SearchBar } from "./SearchBar";
import { AllySettings } from "../settings/AllySettings";
import theme from "../../../theme";
import { SettingsState } from "../../store/StoreTypes";
import { useAllyStore } from "../../store/allyStore";
import { isSameWebsite } from "./utils/urlHelpers";
import { applyAllSettingsToWebView, disableSettings, resetAllInitialSettingsValues, } from "./utils/allyHelpers";
import { AccessibilityMenuIconActive } from "../../assets/AccessibilityMenuIconActive";
import { AccessibilityMenuIcon } from "../../assets/AccessibilityMenuIcon";

const Browser = () => {
	const { writeSetting, getAllSettings, getSettingByKey } = useAllyStore();
	const [url, setUrl] = useState("https://www.sv-kampen.de/");
	const prevUrl = useRef(url);
	const [showSettings, setShowSettings] = useState<boolean>(false);
	const webViewRef = useRef<WebView | null>(null);

	const currentlyActiveSettings = useMemo(
		() => getAllSettings().filter((s) => s.activeStep !== 0),
		[getAllSettings()]
	);

	const [settingsEnabled, setSettingsEnabled] = useState<boolean>(true);

	useEffect(() => {
		if (isSameWebsite(prevUrl.current, url)) {
			applyAllSettingsToWebView(
				webViewRef,
				getAllSettings,
				getSettingByKey
			);
		} else {
			setSettingsEnabled(false);
			resetAllInitialSettingsValues(webViewRef, getAllSettings, writeSetting);
		}
		prevUrl.current = url;
	}, [url])

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
			<Appbar.Header style={{ paddingBottom: 8 ,backgroundColor: theme.colors.secondary }}>
				<IconButton
					selected={showSettings}
					role={"button"}
					accessibilityLabel={"opens and closes accessibility menu"}
					iconColor={theme.colors.secondary}
					style={{
						height: 52,
						width: 52,
						backgroundColor:
							settingsEnabled ? theme.colors.primary : theme.colors.background,
						marginRight:16,
						marginLeft: 8,
					}}
					/*Color Meaning (WCAG SC 1.4.1, Level A): Color should not be used as the only means to convey information or distinguish visual elements.*/
					icon={() =>
						currentlyActiveSettings.length ? (
							<AccessibilityMenuIconActive/>
						) : (
							<AccessibilityMenuIcon/>
						)
					}
					onPress={showSettings ? closeDrawer : openDrawer}
				/>

				<SearchBar setUrl={setUrl} url={url}/>
			</Appbar.Header>

			{/*WebView*/}
			<WebView
				ref={webViewRef}
				source={{ uri: url }}
				onMessage={(event) => handleMessage(event)}
				onLoadEnd={(navState) => {
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
					<AllySettings
						webViewRef={webViewRef}
						settingsEnabled={settingsEnabled}
					/>
					<View
						style={{
							flexDirection: "column",
							justifyContent: "space-evenly",
							padding: 18,
						}}
					>
						<View
							style={{
								marginBottom: 8,
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Text
								style={{
									...theme.ally.text,
									color: settingsEnabled
										? theme.colors.primary
										: theme.colors.background,
								}}
								variant={"labelLarge"}
							>
								Ally Settings Enabled
							</Text>
							<Switch
								value={settingsEnabled}
								onValueChange={() => {
									!settingsEnabled
										? applyAllSettingsToWebView(
											webViewRef,
											getAllSettings,
											getSettingByKey
										)
										: disableSettings(
											webViewRef,
											getAllSettings,
											getSettingByKey,
											0
										);

									setSettingsEnabled(!settingsEnabled);
								}}
								trackColor={{ true: theme.colors.switchTrackTrue }}
								thumbColor={
									settingsEnabled
										? theme.colors.primary
										: theme.colors.background
								}
							/>
						</View>
						<Button
							style={{ borderWidth: 2 }}
							mode={"outlined"}
							onPress={closeDrawer}
						>
							<Text
								style={{ ...theme.ally.text, color: theme.colors.background }}
								variant={"labelLarge"}
							>
								Close Settings
							</Text>
						</Button>
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
