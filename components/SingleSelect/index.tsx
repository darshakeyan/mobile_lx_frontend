import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../../utils/colors";
import { useDispatch } from "react-redux";

const SingleSelect = ({
  data,
  placeholder,
  value,
  title,
  allowSearch,
  selectSearchPlaceholder = "",
  onChange = () => {},
  mode = "",
}: any) => {
  const dispatch = useDispatch();
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={[styles.label]}>{title}</Text>
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
        search={allowSearch}
        searchPlaceholder={selectSearchPlaceholder}
        activeColor="#008080"
        itemTextStyle={{ color: Colors.primaryColor }}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={250}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: any) => {
          mode === "SORTBY"
            ? dispatch(onChange(item.value))
            : onChange(item.value);
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
