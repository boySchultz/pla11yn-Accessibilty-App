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
      placeholder="Suche"
      textContentType={"URL"}
      style={{ ...styles.input, ...theme.ally.text }}
      value={inputText}
      onChangeText={(change) => setInputText(change)}
      role="searchbox"
      aria-label="Suche nach Stichworten oder gib eine URL ein."
      right={
        <TextInput.Icon
          iconColor={theme.colors.secondary}
          size={40}
          aria-label="Suche"
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
    marginBottom: 8,
    fontSize: 18,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
    height: 70,
    marginRight: 16,
    paddingHorizontal: 16,
  },
});
