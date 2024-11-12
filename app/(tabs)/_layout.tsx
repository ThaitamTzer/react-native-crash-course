import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "../../constants/icons";
import { ImageProps, ColorValue } from "react-native";
import { StatusBar } from "expo-status-bar";

const TabIcon = ({
  focused,
  name,
  color,
  icon,
}: {
  focused: boolean;
  name: string;
  color: ColorValue;
  icon: ImageProps;
}) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        tintColor={color}
        resizeMode="contain"
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                focused={focused}
                name="Home"
                color={color}
                icon={icons.home}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                focused={focused}
                name="Bookmark"
                color={color}
                icon={icons.bookmark}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                focused={focused}
                name="Create"
                color={color}
                icon={icons.plus}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                focused={focused}
                name="Profile"
                color={color}
                icon={icons.profile}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="light" />
    </>
  );
};

export default TabsLayout;
