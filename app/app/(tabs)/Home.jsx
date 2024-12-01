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

  const [personalRssFeeds, setPersonalRssFeeds] = useState([]);

  const addPlatformOption = ({idNum, platformName, feedLink}) => {
    const newOption = { id: idNum, name: platformName, selected: false, component: null, link: feedLink };
    setFeedOptions(prevOptions => [...prevOptions, newOption]);
  };

  const getPersonalRssFeeds = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys(); // Fetch all keys
      const rssFeedKeys = allKeys.filter((key) => key.startsWith('@rss_feed')); // Filter keys with @rss_feed prefix
  
      // Retrieve the values for these keys
      const rssFeeds = await Promise.all(
        rssFeedKeys.map(async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value != null ? JSON.parse(value) : null; // Parse JSON value
        })
      );
  
      setPersonalRssFeeds(rssFeeds);
    } 
    catch (error) {
      console.error("Error retrieving RSS feeds:", error);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      //console.log('Tab Screen is focused');
      getPersonalRssFeeds();

      //FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      personalRssFeeds.forEach(feed => {
        // Check if the 'name' field of the current feed exists in feedOptions
        const exists = feedOptions.some(option => option.name === feed.name);
        
        // If the feed name doesn't exist in feedOptions, add the feed to feedOptions
        if (!exists) {
          const idNum = feedOptions.length + 1;
          addPlatformOption(idNum, feed.name, feed.link)
        }
      });

      return () => {
        //console.log('Tab Screen is unfocused');
      };
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{height: 60, backgroundColor: "#161622",borderTopWidth: 1,borderTopColor: "#232533",}} >
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