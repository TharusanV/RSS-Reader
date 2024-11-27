import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";

import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.tabIconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }]}
      />
      <Text
        style={[
          styles.text,
          focused ? styles.textFocused : styles.textRegular,
          { color: color },
        ]}
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
      options={{ headerShown: false }}
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 64,
          },
        }}
      >
        <Tabs.Screen 
          name="Home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen 
          name="BBCPage"
          options={{
            title: 'BBCPage',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="BBC"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout

const styles = StyleSheet.create({
  tabIconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8, // Alternative: use margin on child elements if `gap` isn't supported
  },
  icon: {
    width: 24, // Tailwind `w-6`
    height: 24, // Tailwind `h-6`
  },
  text: {
    fontSize: 12, // Tailwind `text-xs`
  },
  textFocused: {
    fontFamily: "psemibold", // Tailwind `font-psemibold`
  },
  textRegular: {
    fontFamily: "pregular", // Tailwind `font-pregular`
  },
  tabBar: {
    backgroundColor: "#161622",
    borderTopWidth: 1,
    borderTopColor: "#232533",
    height: 84,
  },
});