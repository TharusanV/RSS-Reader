import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; 

const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View style={{ marginTop: 12, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <Ionicons
        name={icon}
        color={color}
        size={24}
      />
      <Text
        numberOfLines={1}
        style={{
          fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular',
          fontSize: 12,
          color: color,
          width: "100%",
        }}
      >
        {name}
      </Text>
    </View>
  );
}

const TabsLayout = () => {

  const bgColour = "#161622";

  return (
    <>
      <Tabs
        options={{ headerShown: false }}

        screenOptions={{
          /*tabBarPosition: 'top',*/
          /*tabBarScrollEnabled: true,*/
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: bgColour, borderTopColor: bgColour, zIndex: 10, },
        }}
      >
        <Tabs.Screen 
          name="Home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"home-outline"}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen 
          name="FavPage"
          options={{
            title: 'FavPage',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"bookmark-outline"}
                color={color}
                name="Favourites"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen 
          name="SettingsPage"
          options={{
            title: 'SettingsPage',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"settings-outline"}
                color={color}
                name="Settings"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>



      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default TabsLayout
