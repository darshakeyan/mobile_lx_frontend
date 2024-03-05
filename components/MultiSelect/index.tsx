import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

interface IGenres {
  id: number;
  name: string;
}

const MultipleSelect = ({ data, onChange, setValues }: any) => {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState<IGenres[]>([]);
  const toggleSelection = (item: IGenres) => {
    if (selectedItems.find((i) => i.id === item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  return (
    <View style={styles.container}>
      {data.map((item: IGenres) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.item,
            selectedItems.find((i) => i.id === item.id) && styles.selectedItem,
          ]}
          onPress={() => {
            toggleSelection(item);
            setValues(selectedItems);
          }}
        >
          <Text style={{ color: "white" }}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  item: {
    borderWidth: 0.6,
    borderColor: "white",
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  selectedItem: {
    backgroundColor: "#008080",
    color: "white",
  },
});

export default MultipleSelect;
