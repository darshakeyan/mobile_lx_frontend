import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
} from "react-native";
import { Colors } from "../../utils/colors";
import SingleSelect from "../SingleSelect";
import { useLanguages } from "../../service/auth";
import { useSelector } from "react-redux";
import { setFilters } from "../../redux/actions";

const FilterModal = ({ visible, setVisible }: any) => {
  const { filters } = useSelector((state: any) => state.app);
  const hide = () => setVisible(false);

  const { data } = useLanguages();
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={hide}>
              <AntDesign
                color={Colors.primaryColor}
                name="close"
                size={30}
                style={{ fontWeight: "800" }}
              />
            </TouchableOpacity>

            <View
              style={{
                display: "flex",
                width: "85%",
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>{"Filters "}</Text>
            </View>
          </View>
          <SingleSelect
            data={languages}
            placeholder="Select Language"
            value={filters.language}
            mode="FILTERBY"
            title="Language"
            allowSearch={true}
            selectSearchPlaceholder="Search for a Language"
            onChange={setFilters}
          />
          {/* Multiple Checkbox */}
          <Text style={styles.text}>Genres</Text>
          {/* Multiple Checkbox */}
          <Text style={styles.text}>Certifications</Text>
          {/* Input Field */}
          <Text style={styles.text}>Keywords</Text>
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
    height: 300,
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
});

export default FilterModal;
