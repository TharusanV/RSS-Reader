import { View, Button, Text, StyleSheet, ScrollView, Image, Dimensions, Pressable, Linking, TouchableOpacity, Alert} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';

import { useSharedContext } from './SharedContext';


const FavPage = () => {
  
  const {personalRssFeeds, setPersonalRssFeeds, favouriteArticle, setFavouriteArticle, feedOptions, setFeedOptions, addPlatformOption, deleteItemByKey, getPersonalRssFeeds, getFavouriteArticles  } = useSharedContext();

  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log(`Cannot open the URL: ${url}`);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const deleteFavouriteByKey = async (keyName) => {
    try {
      await AsyncStorage.removeItem(`@rss_favourites_${keyName}`); // Remove the item with the given key
      //console.log(`Deleted item with key: ${keyName}`);

      setFavouriteArticle((prevArticles) => prevArticles.filter((item) => item.title !== keyName));
    } catch (error) {
      console.error(`Error deleting item with key ${key}:`, error);
    }
  };

  useEffect(() => {
    getFavouriteArticles();
  }, []); 

  useFocusEffect(
    React.useCallback(() => {
      getFavouriteArticles();

      return () => {
        /*console.log('Tab Screen is unfocused');*/
      };
    }, [/**/]) 
  );


  const bgColour = "#202124";
  const textColour = "#FFFFFF";
  const textDescriptionColour = "#9fa2a1";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColour}}>
      <View style={{ marginTop: 10, flex: 1, alignItems: 'center',}} >
        <View style={{ width: '90%'}}>
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ }}
          >
            <Text style={{fontSize: 24,fontWeight: 'bold', color: textColour}}>Favourite Feeds</Text>
            <View style={{marginTop: 10}}>
              {favouriteArticle.map((item, index) => (
                <Pressable key={index} onPress={() => openLink(item.link)} style={{width: 240*1.4, marginBottom: 20, alignItems: 'flex-start'}}>
                  {item.thumbnail && (
                    <Image
                      source={{ uri: item.thumbnail }}
                      style={{ width: '100%', height: 130*1.4 }}
                      resizeMode="contain"
                    />
                  )}
                  
                  <View style={{marginTop: 2}}>
                    <TouchableOpacity onPress={() => deleteFavouriteByKey(item.title)} style={{}}>
                      <Text style={{color: 'red',fontSize: 14,fontWeight: 'bold',}}>-</Text>
                    </TouchableOpacity>
                  </View>


                  <Text style={{ color: textColour, fontSize: 18, fontWeight: 'bold', textAlign: 'left', marginTop: 5}}>
                    {item.title}
                  </Text>

                  <Text style={{ fontSize: 14, color: textDescriptionColour, textAlign: 'left', marginTop: 3 }}>
                    {item.description}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default FavPage