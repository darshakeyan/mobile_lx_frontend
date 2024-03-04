import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";
import { Colors } from "../../utils/colors";

type MovieProps = {
  title: string;
  releaseDate: string;
  onAddToFavorites: () => void;
  onAddToWishlist: () => void;
  rate: string;
  image: any;
};

const Movie = ({
  title,
  releaseDate,
  onAddToFavorites,
  onAddToWishlist,
  rate,
  image,
}: MovieProps) => {
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original${image}`,
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.favIcon} onPress={() => {}}>
          <MaterialIcons name="favorite-outline" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.ratingIcon} onPress={() => {}}>
          <FontAwesome name="star-half-empty" size={30} color="#FFD700" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.releaseDateContainer}>
            <Text style={styles.releaseDate}>Release Date : </Text>
            <Text style={styles.releaseDate}>{releaseDate}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.wishlistIcon} onPress={() => {}}>
          <Entypo name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  favIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  ratingIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#008080",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  info: {
    margin: 10,
  },
  title: {
    color: Colors.primaryColor,
    fontSize: 20,
    marginBottom: 8,
  },
  releaseDateContainer: {
    display: "flex",
    flexDirection: "row",
  },
  releaseDate: {
    color: Colors.primaryColor,
    fontSize: 14,
  },
  wishlistIcon: {
    marginRight: 10,
  },
});

export default Movie;
