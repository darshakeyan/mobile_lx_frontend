import AntDesign from "@expo/vector-icons/AntDesign";
import React, { memo, useCallback } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  ScrollView,
} from "react-native";
import { Colors } from "../../utils/colors";
import SingleSelect from "../SingleSelect";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/actions";
import MultipleSelectList from "../MultiSelect";
import { certification } from "../../screens/home/mock/data";

const FilterModal = ({
  visible,
  hide,
  language,
  setLanguage,
  languagesData,
  genresItems,
  setGenresItems,
  genresData,
  certificationItems,
  setCertificationsItems,
}: any) => {
  const dispatch = useDispatch();
  const { sortByValue } = useSelector((state: any) => state.app);
  const applyFiltersHandler = useCallback(() => {
    dispatch(
      setFilters(
        {
          language: language,
          genres: genresItems,
          certification: certificationItems,
        },
        sortByValue
      )
    );
  }, [dispatch, language, genresItems, certificationItems, sortByValue]);

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
            <SingleSelect
              data={languagesData}
              placeholder="Select Language"
              value={language}
              mode="FILTERBY"
              title="Language"
              allowSearch={true}
              selectSearchPlaceholder="Search for a Language"
              onChange={setLanguage}
            />
            <Text style={styles.text}>Genres</Text>
            <MultipleSelectList
              data={genresData?.data?.genres}
              onChange={setGenresItems}
              selectedData={genresItems}
            />
            <Text style={styles.text}>Certifications</Text>
            <MultipleSelectList
              data={certification}
              onChange={setCertificationsItems}
              selectedData={certificationItems}
            />
            <TouchableOpacity
              onPress={() => {
                applyFiltersHandler();
                hide();
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Apply Filters</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {},
  container: {
    flex: 1,
  },
  closeModal: {
    height: 180,
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
  button: {
    backgroundColor: "#E19133",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default memo(FilterModal);
