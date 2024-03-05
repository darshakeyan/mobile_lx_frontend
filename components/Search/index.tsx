import React, { useCallback, useRef, useState } from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import { useKeywords } from "../../service/auth";

interface IKeywords {
  id: number;
  name: string;
}

const Search = () => {
  const [selectedItem, setSelectedItem] = useState<IKeywords>(); // List isn't showing up Android & iOS
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useKeywords(searchQuery);

  const getSuggestions = useCallback((q: string) => {
    setSearchQuery(q);
  }, []);

  return (
    <View style={[{ flex: 0 }]}>
      <AutocompleteDropdown
        dataSet={data?.data?.results}
        onChangeText={getSuggestions}
        direction={Platform.select({ android: "down" })}
        closeOnBlur={false}
        useFilter={false}
        clearOnFocus={false}
        textInputProps={{
          placeholder: "Filter by Keywords",
          autoCorrect: false,
          autoCapitalize: "none",
          style: {
            borderRadius: 25,
            backgroundColor: "#383b42",
            color: "#fff",
            paddingLeft: 18,
          },
        }}
        rightButtonsContainerStyle={{
          right: 8,
          height: 30,
          alignSelf: "center",
        }}
        inputContainerStyle={{
          backgroundColor: "#383b42",
          borderRadius: 25,
        }}
        suggestionsListContainerStyle={{
          backgroundColor: "#383b42",
        }}
        containerStyle={{ flexGrow: 1, flexShrink: 1 }}
        renderItem={(item: any) => {
          return (
            <Text style={{ color: "white", padding: 15 }}>{item?.name}</Text>
          );
        }}
        inputHeight={50}
        onSelectItem={(item: any) => {
          item && setSelectedItem(item.id);
        }}
        loading={isLoading}
        suggestionsListTextStyle={{
          color: "#8f3c96",
        }}
        EmptyResultComponent={
          <Text style={{ padding: 10, fontSize: 15 }}>Oops</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Search;
