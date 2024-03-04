import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { setSortByValue } from "../../redux/actions";

const sortByOptions = [
  {
    label: "Popularity Ascending",
    value: "popularity.asc",
  },
  {
    label: "Popularity Descending",
    value: "popularity.desc",
  },
  {
    label: "Rating Ascending",
    value: "vote_average.asc",
  },
  {
    label: "Rating Descending",
    value: "vote_average.desc",
  },
  {
    label: "Release Date Ascending",
    value: "primary_release_date.asc",
  },
  {
    label: "Release Date Descending",
    value: "primary_release_date.desc",
  },
];

const SingleSelect = ({}) => {
  const dispatch = useDispatch();
  const { sortByValue } = useSelector((state: any) => state.app);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={[styles.label]}>Sort Results By</Text>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: Colors.primaryColor },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemContainerStyle={{
          backgroundColor: Colors.primaryBg,
        }}
        activeColor="#008080"
        itemTextStyle={{ color: Colors.primaryColor }}
        iconStyle={styles.iconStyle}
        data={sortByOptions}
        maxHeight={250}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Sort By Option" : "..."}
        value={sortByValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: any) => {
          dispatch(setSortByValue(item.value));
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={Colors.primaryColor}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBg,
    padding: 8,
  },
  dropdown: {
    height: 40,
    borderColor: "white",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    color: Colors.primaryColor,
    fontWeight: "600",
    fontSize: 14,
    width: "100%",
    marginBottom: 8,
  },
  placeholderStyle: {
    fontSize: 13,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default SingleSelect;
