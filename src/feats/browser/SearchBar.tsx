import { TextInput, Button } from "react-native-paper";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import theme from "../../../theme";

interface SearchBarProps {
  url: string;
  setUrl: (url: string) => void;
}

export const SearchBar = ({ setUrl, url }: SearchBarProps) => {
  const [inputText, setInputText] = useState(url);

  const handleSearch = (searchText: string) => {
    if (isValidURL(searchText)) {
      if (!searchText.match(/^https?:\/\//i)) {
        searchText = `https://www.${searchText}`;
      }
      setUrl(searchText);
    } else {
      const searchQuery = encodeURIComponent(searchText);
      setUrl(`https://www.google.com/search?q=${searchQuery}`);
    }
  };

  const isValidURL = (url: string) => {
    const pattern =
      /^(https?:\/\/)?([a-z0-9]+\.)?[a-z0-9]+\.[a-z]{2,}(\/.*)?$/i;
    return pattern.test(url);
  };
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Search or enter URL"
        value={inputText}
        onChangeText={(change) => setInputText(change)}
      />
      <Button
        mode={"text"}
        buttonColor={theme.colors.secondary}
        onPress={() => handleSearch(inputText)}
      >
        Search
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.background,
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
});
