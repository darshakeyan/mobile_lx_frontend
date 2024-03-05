import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
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
} from "react-native";
import { Colors } from "../../utils/colors";
import SingleSelect from "../SingleSelect";
import { useGenres, useLanguages } from "../../service/auth";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/actions";
import Search from "../Search";
import MultipleSelectList from "../MultiSelect";
import { certification } from "../../screens/home/mock/data";

const FilterModal = ({ visible, setVisible }: any) => {
  const { filters } = useSelector((state: any) => state.app);
  const hide = () => setVisible(false);

  const { data } = useLanguages();
  const { data: genres, isLoading: isGenresLoading } = useGenres();

  const languages = data?.data?.map((lang: any) => ({
    label: lang.english_name,
    value: lang.iso_639_1,
  }));

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
          <Text style={styles.text}>Keywords</Text>
          <Search />
          <SingleSelect
            data={languages}
            placeholder="Select Language"
            value={filters.language}
            mode="FILTERBY"
            title="Language"
            allowSearch={true}
            selectSearchPlaceholder="Search for a Language"
          />
          <Text style={styles.text}>Genres</Text>
          {isGenresLoading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <MultipleSelectList
              data={genres?.data?.genres}
              onChange={setFilters}
              mode="GENRES"
            />
          )}
          <Text style={styles.text}>Certifications</Text>
          <MultipleSelectList data={certification} mode="CERTIFICATE" />
        </View>
      </SafeAreaView>
      <Button
        title="Apply"
        onPress={() => {
          // send params to an API
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

export default FilterModal;
