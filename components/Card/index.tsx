import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../utils/colors";

type CardProps = {
  children: React.JSX.Element;
};

const Card = ({ children }: CardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginHorizontal: 8,
  },
  card: {
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: Colors.primaryColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.24,
    shadowRadius: 8,
    elevation: 4,
    width: "100%",
  },
});

export default Card;
