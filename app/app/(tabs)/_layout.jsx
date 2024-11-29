import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";

import { icons } from "../../constants";
import BBCLogo from "../../assets/icons/BBC_News_2019.svg"
import SkyLogo from "../../assets/icons/Sky-news-logo.svg"


const TabIcon = ({color, name, focused}) => {
  switch (name) {
    case 'BBC':
      return (
        <View>
          <BBCLogo 
            width={24} 
            height={24} 
            style={{ marginTop: 24}}
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
    case 'Sky News':
      return (
        <View>
          <SkyLogo 
            width={24} 
            height={24} 
            style={{ marginTop: 24}}
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
    default:
      return (
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Image
            source={icons.home}
            resizeMode="contain"
            tintColor={color}
            style={{ width: 24, height: 24, marginTop: 24}}
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
                color={color}
                name="BBC"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen 
          name="SkyNewsPage"
          options={{
            title: 'SkyNewsPage',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name="Sky News"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen 
          name="OtherNewsPage"
          options={{
            title: 'OtherNewsPage',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name="Other"
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
