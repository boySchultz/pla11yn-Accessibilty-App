import { TextInput } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { handleSearch } from "./utils/urlHelpers";
import theme from "../../../theme";

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
    <TextInput
      multiline={false}
      placeholder="Search or enter URL"
      textContentType={"URL"}
      style={styles.input}
      value={inputText}
      onChangeText={(change) => setInputText(change)}
      // numberOfLines={1}
      role="searchbox"
      aria-label="Search or enter URL"
      right={
        <TextInput.Icon
          iconColor={theme.colors.secondary}
          size={40}
          aria-label="Search"
          role="button"
          icon="magnify"
          onPress={() => handleSearch(inputText, setUrl)}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    flex: 1,
    overflow: "hidden",
    backgroundColor: theme.colors.background,
    height: 48,
    marginHorizontal: 8,
    marginRight: 16,
    paddingHorizontal: 16,
  },
});
