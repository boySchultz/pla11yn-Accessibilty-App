import { TextInput, Button } from "react-native-paper";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import theme from "../../../theme";
import { handleSearch } from "./utils/urlHelpers";

interface SearchBarProps {
  url: string;
  setUrl: (url: string) => void;
}

export const SearchBar = ({ setUrl, url }: SearchBarProps) => {
  const [inputText, setInputText] = useState(url);

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
        onPress={() => handleSearch(inputText, setUrl)}
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
