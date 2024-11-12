import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import icons from "@/constants/icons";

const FormField = ({
  title,
  value,
  handleChange,
  otherStyles,
  keyboardType,
  placeholder,
  ...props
}: {
  title: string;
  value: string;
  handleChange: (e: string) => void;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  [key: string]: any;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View className={`flex flex-col space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View
        className={`mt-2 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 ${
          isFocused ? "border-secondary" : "border-black-200"
        } flex flex-row items-center`}
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChange}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
