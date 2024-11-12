import { View, Text, Image, ScrollView, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "@/components/FormField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/libs/appwrite";
import { useGlobalContext } from "@/context/AuthContext";

const SignUp = () => {
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { setIsLogged, setUser } = useGlobalContext();

  const submit = async () => {
    if (!value.username || !value.email || !value.password) {
      Alert.alert("Error", "Please fill all fields");
    }

    setLoading(true);
    try {
      const result = await createUser(
        value.email,
        value.password,
        value.username
      );
      setUser(result);
      setIsLogged(true);

      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />

          <Text className=" text-2xl mt-10 text-white font-psemibold">
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            value={value.username}
            handleChange={(e) => setValue({ ...value, username: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={value.email}
            handleChange={(e) => setValue({ ...value, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={value.password}
            otherStyles="mt-7"
            handleChange={(e) => setValue({ ...value, password: e })}
          />
          <CustomButton
            title="Sign up"
            containerStyles="mt-7"
            handlePress={() => submit()}
            isLoading={loading}
          />
          <View className="flex flex-row justify-center items-center mt-7">
            <Text className="text-white">Already have an account?</Text>
            <Link
              href="./sign-in"
              className="text-secondary-200 font-psemibold ml-1"
            >
              Log in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
