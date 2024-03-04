import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const NotFound = () => {
  return (
    <View style={styles.image}>
      <Image
        source={require("../../assets/images/notFound.png")}
        resizeMode="cover"
        alt="Image not Available"
      />
      <Text style={styles.text}>Movie Image is not Available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#f7f7f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    width: "100%",
    textAlign: "center",
  },
});

export default NotFound;
