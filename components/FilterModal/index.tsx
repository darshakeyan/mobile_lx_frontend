import AntDesign from "@expo/vector-icons/AntDesign";
import React, { memo, useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Colors } from "../../utils/colors";
import SingleSelect from "../SingleSelect";
import { useGenres, useKeywords, useLanguages } from "../../service/auth";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/actions";
import MultipleSelectList from "../MultiSelect";
import { certification } from "../../screens/home/mock/data";
import {
  transformArrayToStringById,
  transformArrayToStringByName,
} from "../../utils/helper";
// import MultiSelectDropdown from "../MultiSelectDropdown";
import { useDebounce } from "../../hooks/useDebounce";

const FilterModal = ({
  visible,
  setVisible,
  // keywords,
  // setKeywords,
  language,
  setLanguage,
  genresItems,
  setGenresItems,
  certificationItems,
  setCertificationsItems,
}: any) => {
  const dispatch = useDispatch();
  const { sortByValue, filters } = useSelector((state: any) => state.app);
  // const [keywordSearchQuery, setKeywordSearchQuery] = useState<string>("");
  // const debouncedSearchValue = useDebounce(keywordSearchQuery || "", 500);
  const { data } = useLanguages();
  const { data: keywordsData, isLoading: isKeywordsLoading } = useKeywords("m");
  const { data: genres, isLoading: isGenresLoading } = useGenres();

  const languages = data?.data?.map((lang: any) => ({
    label: lang.english_name,
    value: lang.iso_639_1,
  }));

  const transformedKeywords = keywordsData?.data?.results?.map(
    (keyword: { id: any; name: any }) => ({
      id: keyword.id,
      label: keyword.name,
      value: keyword.name,
    })
  );

  const hide = () => setVisible(false);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={hide}
      transparent
      style={styles.modal}
    >
      <SafeAreaView style={styles.container}>
        <Pressable style={styles.closeModal} onPress={hide} />
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={hide}>
              <AntDesign
                color={Colors.primaryColor}
                name="close"
                size={30}
                style={{ fontWeight: "800" }}
              />
            </TouchableOpacity>

            <View style={{ marginRight: 170 }}>
              <Text style={styles.text}>{"Filters "}</Text>
            </View>
          </View>
          <ScrollView>
            {/* <Text style={styles.text}>Keywords</Text>
            <MultiSelectDropdown
              data={transformedKeywords}
              onChange={setKeywords}
              setKeywordSearchQuery={setKeywordSearchQuery}
              keywords={keywords}
            /> */}
            <SingleSelect
              data={languages}
              placeholder="Select Language"
              value={language}
              mode="FILTERBY"
              title="Language"
              allowSearch={true}
              selectSearchPlaceholder="Search for a Language"
              onChange={setLanguage}
            />
            <Text style={styles.text}>Genres</Text>
            {isGenresLoading ? (
              <ActivityIndicator size={"small"} color={"white"} />
            ) : (
              <MultipleSelectList
                data={genres?.data?.genres}
                mode="GENRES"
                onChange={setGenresItems}
                values={genresItems}
              />
            )}
            <Text style={styles.text}>Certifications</Text>
            <MultipleSelectList
              data={certification}
              mode="CERTIFICATE"
              onChange={setCertificationsItems}
              values={certificationItems}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
      <Button
        title="Apply"
        onPress={() => {
          dispatch(
            setFilters(
              {
                // keywords: keywords?.join("|"),
                language: language,
                genres: transformArrayToStringById(genresItems),
                certification: transformArrayToStringByName(certificationItems),
              },
              sortByValue
            )
          );
          hide();
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {},
  container: {
    flex: 1,
  },
  closeModal: {
    height: 80,
    backgroundColor: Colors.primaryColor,
    opacity: 0.3,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBg,
    display: "flex",
    padding: 8,
    borderTopWidth: 0.5,
    borderTopColor: Colors.primaryColor,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    padding: 8,
  },
  headerContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default memo(FilterModal);
