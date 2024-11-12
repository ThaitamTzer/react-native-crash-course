import { View, Text, Image, ScrollView, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "@/components/FormField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "@/libs/appwrite";
import { useGlobalContext } from "@/context/AuthContext";

const SignIn = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { setIsLogged, setUser } = useGlobalContext();

  const submit = async () => {
    if (!value.email || !value.password) {
      Alert.alert("Error", "Please fill all fields");
    }

    setLoading(true);
    try {
      const result = await signIn(value.email, value.password);
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
            Login to Aora
          </Text>
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
          <View className="mt-7">
            <Text className="text-white text-right">Forgot password?</Text>
          </View>
          <CustomButton
            title="Log in"
            containerStyles="mt-7"
            handlePress={() => submit()}
            isLoading={loading}
          />
          <View className="flex flex-row justify-center items-center mt-7">
            <Text className="text-white">Don't have an account?</Text>
            <Link
              href="./sign-up"
              className="text-secondary-100 font-psemibold ml-1"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
