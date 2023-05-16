import { Button } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput } from "react-native";
import theme from "../../../theme";
import { handleSearch } from "./utils/urlHelpers";

interface SearchBarProps {
	url: string;
	setUrl: (url: string) => void;
}

export const SearchBar = ({ setUrl, url }: SearchBarProps) => {
	const [inputText, setInputText] = useState(url);

	useEffect(() => {
		setInputText(url);
	}, [url]);

	return (
		<>
			<TextInput
				placeholder="Search or enter URL"
				textContentType={"URL"}
				style={styles.input}
				value={inputText}
				onChangeText={(change) => setInputText(change)}
				numberOfLines={1}
				role="searchbox"
				aria-label="Search or enter URL"
			/>
			<Button
				mode={"text"}
				buttonColor={theme.colors.secondary}
				onPress={() => handleSearch(inputText, setUrl)}
				role="button"
				aria-label="Search"
			>
				Search
			</Button>
		</>
	);
};

const styles = StyleSheet.create({
	input: {
		fontSize: 18,
		flex: 1,
		overflow: "hidden",
		backgroundColor: theme.colors.background,
		height: 40,
		marginHorizontal: 12,
		paddingHorizontal: 12,
	},
});
