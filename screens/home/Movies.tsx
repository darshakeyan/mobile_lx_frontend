import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SingleSelect from "../../components/SingleSelect";
import Movie from "../../components/Movie";
import Card from "../../components/Card";
import { Colors } from "../../utils/colors";
import { data } from "../../mock/movies";
import { logOutFromAccount } from "../../redux/actions";

const Movies = () => {
  const dispatch = useDispatch();
  const addToFavHandler = () => {
    console.log("ADD FAV");
  };

  const addToWishListHandler = () => {
    console.log("Add to Wishlist");
  };

  return (
    <View className="bg-[#0b0404] px-2 h-full w-full">
      <StatusBar style="light" />
      <View className="space-y-5">
        <View className="flex-row justify-between items-center mt-12 mx-2">
          <Image
            className="h-10 w-10"
            source={require("../../assets/images/icon.jpg")}
          />
          <SingleSelect />
        </View>

        <View style={styles.movieContainer}>
          <Text style={styles.movieTitle}>Movies</Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(logOutFromAccount());
            }}
          >
            <Text style={{ color: "white" }}>Logout</Text>
          </TouchableOpacity>
          <FlatList
            data={data.movies}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <Card>
                  <Movie
                    title={item.title}
                    releaseDate={item.realease_date}
                    onAddToFavorites={addToFavHandler}
                    onAddToWishlist={addToWishListHandler}
                    rate={item.rate}
                    image={item.image}
                  />
                </Card>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  movieContainer: {},
  movieTitle: {
    fontSize: 18,
    marginBottom: 8,
    marginLeft: 10,
    color: Colors.primaryColor,
  },
});

export default Movies;

// action used and called in UI along with the data required by action itself.

// -> how to called a redux action
// -> by using dispatcher hook (useDispatch) from 'react-redux' -> help to call the action
// -> E.X => dispatch(/* call your action along with data */)
