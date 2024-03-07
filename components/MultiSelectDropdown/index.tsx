import React, { memo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../../utils/colors";

const MultiSelectDropdown = ({
  data,
  onChange,
  keywords,
  setKeywordSearchQuery,
}: any) => {
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  const handleSearch = (text: any) => {
    setKeywordSearchQuery(text);
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        data={data}
        labelField="label"
        valueField="id"
        placeholder="Select Keyword"
        searchPlaceholder="Search Keyword"
        value={keywords}
        onChange={(item) => {
          onChange(item);
        }}
        onChangeText={handleSearch}
        renderItem={renderItem}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="white"
            name="Safety"
            size={22}
          />
        )}
        selectedTextStyle={{ color: "#008080" }}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 8 },
  dropdown: {
    height: 50,
    borderWidth: 0.5,
    borderColor: "white",
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    borderColor: Colors?.primaryBg,
    borderRadius: 12,
  },
  icon: {
    marginRight: 8,
  },
  selectedStyle: {
    borderRadius: 12,
    color: "white",
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default memo(MultiSelectDropdown);
