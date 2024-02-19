import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SingleSelect = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{"Filter "}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  text: {
    color: "white",
  },
});

export default SingleSelect;
