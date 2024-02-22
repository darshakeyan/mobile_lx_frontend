import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { isValidEmail, isValidPassword } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { signupToAccount } from "../../redux/actions";
import { Colors } from "../../utils/colors";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const validEmail = isValidEmail(email);
  const validPassword = isValidPassword(password);

  const dispatch = useDispatch();

  const { isSignUpLoading, isUserExist } = useSelector(
    (state: any) => state.auth
  );

  return (
    <View className="h-full w-full flex justify-around pt-32 pb-10 bg-[#0b0404]">
      <StatusBar style="light" />
      <View className="flex items-center">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          className="h-20 w-20 rounded-full"
          source={require("../../assets/images/lx.jpg")}
        />
      </View>
      <View className="flex items-center mx-4 gap-y-5">
        <Animated.View
          entering={FadeInLeft.delay(400).duration(1000).springify()}
          className="bg-gray-400 p-5 rounded-2xl w-full text-white"
        >
          <TextInput
            className="text-white w-full"
            placeholder="Name"
            placeholderTextColor={"white"}
            onChangeText={(text) => setName(text)}
          />
          {!name && (
            <Text className="bg-red-400/60 text-gray-100 mt-3 p-2 ml-[-9] rounded-lg text-xs">
              {"Name Should not be Empty!"}
            </Text>
          )}
        </Animated.View>
        <Animated.View
          entering={FadeInRight.delay(600).duration(1000).springify()}
          className="bg-gray-400 p-5 rounded-2xl w-full text-white"
        >
          <TextInput
            className="text-white w-full"
            placeholder="Email"
            placeholderTextColor={"white"}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          {!validEmail && (
            <Text className="bg-red-400/60 text-gray-100 mt-3 p-2 ml-[-9] rounded-lg text-xs">
              {"Email is not valid"}
            </Text>
          )}
        </Animated.View>
        <Animated.View
          entering={FadeInRight.delay(800).duration(1000).springify()}
          className="bg-gray-400 p-5 rounded-2xl w-full mb-3"
        >
          <View className="flex-row items-center justify-between mr-8 gap-x-2">
            <TextInput
              className="text-white w-full"
              placeholder="Password"
              placeholderTextColor={"white"}
              secureTextEntry={!showPassword}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="white"
              onPress={toggleShowPassword}
            />
          </View>
          {!validPassword && (
            <Text className="bg-red-400/60 text-gray-100 mt-3 p-2 ml-[-9] rounded-lg text-xs">
              {"Min length 8, at least 1 letter and 1 number"}
            </Text>
          )}
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(800).duration(1000).springify()}
          className="w-full"
        >
          <TouchableOpacity
            className={`w-full ${
              !validEmail && !validPassword ? "bg-gray-800" : "bg-white"
            } border border-white p-3 rounded-2xl mb-3`}
            disabled={!validEmail && !validPassword}
            onPress={() => {
              dispatch(signupToAccount({ name, email, password }));
            }}
          >
            <Text
              className={`text-xl font-bold ${
                !validEmail && !validPassword
                  ? "text-gray-500"
                  : "text-[#0b0404]"
              } text-center`}
            >
              Sign Up
            </Text>
            {isSignUpLoading && (
              <ActivityIndicator size={"small"} color={Colors.primaryBg} />
            )}
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
          className="flex-row justify-center gap-x-2"
        >
          <Text className="text-gray-400">{`Already member? `}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.push("Login");
            }}
          >
            <Text className="text-white font-extrabold">{`Sign In `}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default Signup;
