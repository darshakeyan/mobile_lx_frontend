import React, { memo, useCallback, useMemo, useRef, useState } from "react";
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
import { useGenres, useInfiniteMovies, useLanguages } from "../../service/auth";
import { useDispatch, useSelector } from "react-redux";
import { logOutFromAccount, setFilters } from "../../redux/actions";
import FilterModal from "../../components/FilterModal";
import AntDesign from "@expo/vector-icons/AntDesign";
import { sortByOptions } from "./mock/data";
import { IGenres } from "../../types/auth";

const Movies = () => {
  const dispatch = useDispatch();

  const [language, setLanguage] = useState<any>(null);
  const [genresItems, setGenresItems] = useState<IGenres[]>([]);
  const [certificationItems, setCertificationsItems] = useState<IGenres[]>([]);
  
  const [modalVisible, setModalVisible] = useState(false);

  const { sortByValue, filters } = useSelector((state: any) => state.app);
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
    hasNextPage,
  } = useInfiniteMovies(sortByValue, filters);
  const moviesData = data?.pages.flatMap((page) => {
    return page?.data?.results?.map((movie: any) => {
      try {
        return movie;
      } catch (e) {
        console.log("Error", { movie });
      }
    });
  });
  const { data: languages } = useLanguages();
  const languagesData = languages?.data?.map((lang: any) => ({
    label: lang.english_name,
    value: lang.iso_639_1,
  }));
  const { data: genres } = useGenres();

  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);
  const renderSpinner = () => {
    return <ActivityIndicator color="white" size={"large"} />;
  };
  const show = () => setModalVisible(true);
  const hide = () => setModalVisible(false);

  return (
    <View className="bg-[#0b0404] px-2 h-full w-full">
      <StatusBar style="light" />
      <View className="space-y-5">
        <View className="flex-row justify-between items-center mt-12 mx-2">
          <Image
            className="h-10 w-10"
            source={require("../../assets/images/icon.jpg")}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            className="space-x-3"
          >
            <TouchableOpacity onPress={show}>
              <AntDesign color={"#E19133"} name="filter" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(logOutFromAccount());
              }}
            >
              <AntDesign
                color="red"
                name="logout"
                size={24}
                style={{ fontWeight: "800" }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {modalVisible && (
          <FilterModal
            visible={modalVisible}
            hide={hide}
            language={language}
            setLanguage={setLanguage}
            languagesData={languagesData}
            genresItems={genresItems}
            setGenresItems={setGenresItems}
            genresData={genres}
            certificationItems={certificationItems}
            setCertificationsItems={setCertificationsItems}
          />
        )}

        <SingleSelect
          data={sortByOptions}
          placeholder="Select Sort By Option"
          value={sortByValue}
          title="Sort Results By"
          allowSearch={false}
          onChange={setFilters}
          mode="SORTBY"
        />

        <View>
          <Text style={{ color: "white" }}>{sortByValue?.label}</Text>
          <Text style={{ color: "white" }}>{language?.label}</Text>
        </View>

        <View style={styles.movieContainer}>
          <Text style={styles.movieTitle}>Movies</Text>
          {isLoading ? (
            <ActivityIndicator size={"large"} color={"white"} />
          ) : (
            <FlatList
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
              onEndReachedThreshold={0.6}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, idx) => {
                return item.id.toString() + idx;
              }}
              onRefresh={() => fetchPreviousPage()}
              refreshing={isFetchingPreviousPage}
              contentContainerStyle={{ paddingBottom: 700 }}
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

export default memo(Movies);

// action used and called in UI along with the data required by action itself.

// -> how to called a redux action
// -> by using dispatcher hook (useDispatch) from 'react-redux' -> help to call the action
// -> E.X => dispatch(/* call your action along with data */)
