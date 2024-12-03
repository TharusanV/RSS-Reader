import React, { createContext, useContext, useState } from 'react';

import BBCLogo from "../../assets/icons/BBC_News_2019.svg"
import SkyLogo from "../../assets/icons/Sky-news-logo.svg"

import AsyncStorage from '@react-native-async-storage/async-storage';

const SharedContext = createContext();

export function useSharedContext() {
  return useContext(SharedContext);
}

export function SharedProvider({ children }) {
  const [personalRssFeeds, setPersonalRssFeeds] = useState([]);
  const [favouriteArticle, setFavouriteArticle] = useState([]);

  const [feedOptions, setFeedOptions] = useState([
    { id: 1, name: "BBC News", selected: true, component: BBCLogo, link: "https://feeds.bbci.co.uk/news/rss.xml"},
    { id: 2, name: "Sky News", selected: false, component: SkyLogo, link: "https://feeds.skynews.com/feeds/rss/home.xml" },
  ]);


  const addPlatformOption = ({idNum, platformName, feedLink}) => {
    const newOption = { id: idNum, name: platformName, selected: false, component: null, link: feedLink };
    setFeedOptions(prevOptions => [...prevOptions, newOption]);
  };

  const deleteItemByKey = async (keyName) => {
    try {
      await AsyncStorage.removeItem(`@rss_feed_${keyName}`); // Remove the item with the given key
      //console.log(`Deleted item with key: ${keyName}`);

      setPersonalRssFeeds((prevFeeds) => prevFeeds.filter((item) => item.name !== keyName));
    } catch (error) {
      console.error(`Error deleting item with key ${key}:`, error);
    }
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
  
  const getFavouriteArticles = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const favouriteKeys = allKeys.filter((key) => key.startsWith('@rss_favourites'));

      const favouriteArticles = await Promise.all(
        favouriteKeys.map(async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value != null ? JSON.parse(value) : null;
        })
      );

      setFavouriteArticle(favouriteArticles.filter(article => article !== null)); // Filter out any null values
    } catch (error) {
      console.error("Error retrieving RSS feeds:", error);
    }
  };

  return (
    <SharedContext.Provider value={{ personalRssFeeds, setPersonalRssFeeds, favouriteArticle, setFavouriteArticle, feedOptions, setFeedOptions, addPlatformOption, deleteItemByKey, getPersonalRssFeeds, getFavouriteArticles  }}>
      {children}
    </SharedContext.Provider>
  );
}
