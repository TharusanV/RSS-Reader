import { View, Text, ScrollView, Pressable,} from 'react-native'
import React, { useState } from 'react';
import GetFeed from '../getFeed'
import { SafeAreaView } from "react-native-safe-area-context";

import { useFocusEffect } from '@react-navigation/native';

import BBCLogo from "../../assets/icons/BBC_News_2019.svg"
import SkyLogo from "../../assets/icons/Sky-news-logo.svg"

import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [feedOptions, setFeedOptions] = useState([
    { id: 1, name: "BBC News", selected: true, component: BBCLogo, link: "https://feeds.bbci.co.uk/news/rss.xml"},
    { id: 2, name: "Sky News", selected: false, component: SkyLogo, link: "https://feeds.skynews.com/feeds/rss/home.xml" },
  ]);

  const [personalRssFeeds, setPersonalRssFeeds] = useState([

  ]);

  const addPlatformOption = ({idNum, platformName, feedLink}) => {
    const newOption = { id: idNum, name: platformName, selected: false, component: null, link: feedLink };
    setFeedOptions(prevOptions => [...prevOptions, newOption]);
  };

  const getPersonalRssFeeds = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const rssFeedKeys = allKeys.filter((key) => key.startsWith('@rss_feed'));

      const rssFeeds = await Promise.all(
        rssFeedKeys.map(async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value != null ? JSON.parse(value) : null;
        })
      );

      setPersonalRssFeeds(rssFeeds.filter(feed => feed !== null)); // Filter out any null values
    } catch (error) {
      console.error("Error retrieving RSS feeds:", error);
    }
  };
  

  useFocusEffect(
    React.useCallback(() => {
      //console.log('Tab Screen is focused');
      getPersonalRssFeeds().then(() => {
        setFeedOptions((currentFeedOptions) => {
          // Create a map of current feed names for fast lookup
          const existingNames = new Set(currentFeedOptions.map(option => option.name));

          // Loop over personalRssFeeds and add any missing ones
          personalRssFeeds.forEach((feed, index) => {
            if (!existingNames.has(feed.name)) {
              const idNum = currentFeedOptions.length + index + 1; // Generate a unique ID
              addPlatformOption({ idNum, platformName: feed.name, feedLink: feed.link });
            }
          });

          return currentFeedOptions; // Return updated feedOptions for clarity, although React handles this.
        });
      });
      

      return () => {
        //console.log('Tab Screen is unfocused');
      };
    }, [personalRssFeeds]) 
  );

  const bgColour = "#161622";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColour}}>
      <View style={{}} >
        <ScrollView horizontal={true}>
          {feedOptions.map((feed) => {
            const IconComponent = feed.component; // Extract the SVG component
            return (
              <Pressable key={feed.id} style={{marginTop: 5, marginLeft: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2}}
                onPress={() => {
                  setFeedOptions(prev => prev.map(item => ({
                    ...item,
                    selected: item.id === feed.id // Set clicked item to selected
                  })));
                }}
              >
                {IconComponent ? (
                  <IconComponent width={20} height={20} />
                ) : (
                  <View style={{ width: 20, height: 20 }} />
                )}
                
                <Text style={{color: feed.selected ? "#FFA001" : "#CDCDE0"}}>{feed.name}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      
      <GetFeed currentFeeds={feedOptions}/>
    </SafeAreaView>
  )
}

export default Home