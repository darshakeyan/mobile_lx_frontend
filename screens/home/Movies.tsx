import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import SingleSelect from "../../components/SingleSelect";
import Movie from "../../components/Movie";
import Card from "../../components/Card";
import { Colors } from "../../utils/colors";
import { useInfiniteMovies, useMovieTrailer } from "../../service/auth";
import { useDispatch, useSelector } from "react-redux";
import { setMovieIdFromViewport, setSortByValue } from "../../redux/actions";
import FilterModal from "../../components/FilterModal";
import AntDesign from "@expo/vector-icons/AntDesign";
import { sortByOptions } from "./mock/data";

const Movies = () => {
  // redux store
  const dispatch = useDispatch();
  const { movieId, sortByValue } = useSelector((state: any) => state.app);

  // local store
  const [modalVisible, setModalVisible] = useState(false);

  // reference
  const movieListRef = useRef(null);
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 100,
    waitForInteraction: true,
  });

  // API data
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
    hasNextPage,
  } = useInfiniteMovies({
    sortBy: sortByValue,
  });

  const { data: video, isLoading: isMovieVideoLoading } =
    useMovieTrailer(movieId);

  const moviesData = data?.pages.flatMap((page) => {
    return page?.data?.results?.map((movie: any) => {
      try {
        return movie;
      } catch (e) {
        console.log("Error", { movie });
      }
    });
  });

  // infinite scrolling
  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const renderSpinner = () => {
    return <ActivityIndicator color="white" size={"large"} />;
  };

  // defining view port
  // research -> youtube video link doesn't support
  const onViewableItemChanged = ({ viewableItems }: any) => {
    if (viewableItems.length === 1) {
      const movieId = viewableItems[0]?.item.id.toString();
      dispatch(setMovieIdFromViewport(movieId));
      // play the video
    } else {
      // pause the video
    }
  };

  const show = () => setModalVisible(true);

  return (
    <View className="bg-[#0b0404] px-2 h-full w-full">
      <StatusBar style="light" />
      <View className="space-y-5">
        <View className="flex-row justify-between items-center mt-12 mx-2">
          <Image
            className="h-10 w-10"
            source={require("../../assets/images/icon.jpg")}
          />
          <TouchableOpacity onPress={show}>
            <AntDesign color={"#E19133"} name="filter" size={24} />
          </TouchableOpacity>
        </View>
        <FilterModal visible={modalVisible} setVisible={setModalVisible} />
        <SingleSelect
          data={sortByOptions}
          placeholder="Select Sort By Option"
          value={sortByValue}
          title="Sort Results By"
          allowSearch={false}
          onChange={setSortByValue}
          mode="SORTBY"
        />

        <View style={styles.movieContainer}>
          <Text style={styles.movieTitle}>Movies</Text>
          {isLoading ? (
            <ActivityIndicator size={"large"} color={"white"} />
          ) : (
            <FlatList
              ref={movieListRef}
              data={moviesData}
              renderItem={({ item }) => (
                <View style={styles.container}>
                  <Card>
                    <Movie
                      title={item.original_title}
                      releaseDate={item.release_date}
                      rate={item.vote_average}
                      image={item.poster_path}
                    />
                  </Card>
                </View>
              )}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.3}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, idx) => {
                return item.id.toString() + idx;
              }}
              onViewableItemsChanged={onViewableItemChanged}
              viewabilityConfig={viewabilityConfig.current}
              onRefresh={() => fetchPreviousPage()}
              refreshing={isFetchingPreviousPage}
              contentContainerStyle={{ paddingBottom: 350 }}
              ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
            />
          )}
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
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
});

export default Movies;

// action used and called in UI along with the data required by action itself.

// -> how to called a redux action
// -> by using dispatcher hook (useDispatch) from 'react-redux' -> help to call the action
// -> E.X => dispatch(/* call your action along with data */)
