import React, { memo, useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import { useDispatch, useSelector } from "react-redux";
import { signinToAccount } from "../../redux/actions";
import { Colors } from "../../utils/colors";
import { ActivityIndicator } from "react-native-paper";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const { userTokenError, isLoading } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View className="h-full w-full flex justify-around pt-32 pb-10 bg-[#0b0404]">
      <StatusBar style="light" />
      <View className="flex items-center">
        <Animated.Image
          entering={FadeInUp.duration(200).springify()}
          className="h-20 w-20 rounded-full"
          source={require("../../assets/images/lx.jpg")}
        />
      </View>
      <View className="flex items-center mx-4 gap-y-5">
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
          className="bg-gray-400 p-5 rounded-2xl w-full text-white"
        >
          <TextInput
            className="text-white w-full"
            placeholder="Email"
            placeholderTextColor={"white"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
          className="bg-gray-400 p-5 rounded-2xl w-full mb-3"
        >
          <View className="flex-row items-center justify-between mr-8 gap-x-2">
            <TextInput
              className="text-white w-full"
              placeholder="Password"
              placeholderTextColor={"white"}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="white"
              onPress={toggleShowPassword}
            />
          </View>
        </Animated.View>
        {userTokenError && (
          <Text style={{ color: Colors.primaryColor, fontSize: 12 }}>
            {`${userTokenError} `}
          </Text>
        )}
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          className="w-full"
        >
          <TouchableOpacity
            className="w-full bg-white border border-white p-3 rounded-2xl mb-3 flex flex-row items-center justify-center space-x-3"
            onPress={() => {
              dispatch(signinToAccount({ email, password }));
            }}
          >
            <Text className="text-xl font-bold text-[#0b0404] text-center">
              Sign In
            </Text>
            {isLoading && (
              <ActivityIndicator size={"small"} color={Colors.primaryBg} />
            )}
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
          className="flex-row justify-center gap-x-2"
        >
          <Text className="text-gray-400">{`New to LX ? `}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text className="text-white font-extrabold">{`Sign up `}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default Login;
