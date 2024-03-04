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
import { useDispatch, useSelector } from "react-redux";
import { logOutFromAccount, setFilters } from "../../redux/actions";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const FilterModal = ({ visible, setVisible }: any) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: any) => state.app);
  const hide = () => setVisible(false);
  const navigation = useNavigation<StackNavigationProp<any>>();

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
          <View style={styles.headerContainer}>
            <View style={styles.left}>
              <TouchableOpacity onPress={hide}>
                <AntDesign
                  color={Colors.primaryColor}
                  name="close"
                  size={30}
                  style={{ fontWeight: "800" }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.center}>
              <Text style={styles.text}>{"Filters "}</Text>
            </View>
            <View style={styles.right}>
              <Button
                title="Logout "
                onPress={() => {
                  dispatch(logOutFromAccount());
                  navigation.navigate("Login");
                }}
              />
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  left: {
    flex: 1,
    alignItems: "flex-start",
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  right: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default FilterModal;
