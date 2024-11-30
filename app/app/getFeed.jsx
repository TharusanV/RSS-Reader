import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, ScrollView, Image, Dimensions, Pressable, Linking} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons"; 

const GetFeed = ({currentFeeds}) => {

  const selectedFeed = currentFeeds.find(feed => feed.selected);

  const [feed, setFeed] = useState([]);
  const [error, setError] = useState('');

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

  const fetchRSSFeed = async () => {
    const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=${selectedFeed.link}`; // Replace with your RSS feed URL

    try {
      const response = await fetch(feedUrl);
      const json = await response.json();

      if (json.status === 'ok') {
        setFeed(json.items); // Save the parsed feed items to state
        //console.log(json.items); // Contains parsed feed items
        setError('');
      } else {
        throw new Error('Failed to fetch feed');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch the RSS feed.');
    }
  };

  useEffect(() => {
    if (selectedFeed) {
      fetchRSSFeed()
    }
  }, [selectedFeed]);

  return (
      <View style={{ marginTop: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{width: "24", marginBottom: 4}}>
            <Pressable onPress={fetchRSSFeed}>
              <Ionicons
                name="refresh-outline"
                color="#161622"
                size={24}
              />
            </Pressable>
          </View>

        <View style={{ width: '90%'}}>
          {error ? (
            <Text style={{ marginBottom: 20, color: 'red', textAlign: 'center' }}>
              {error}
            </Text>
          ) : (
            <ScrollView 
              showsVerticalScrollIndicator={false} 
              contentContainerStyle={{ 
                marginTop: 20, 
                paddingRight: 10, 
                paddingBottom: 50, 
                alignItems: "center"
              }}
            >
              {feed.map((item, index) => (
                <Pressable 
                  key={index} 
                  onPress={() => openLink(item.link)}
                  style={{
                    width: 240*1.4, 
                    marginBottom: 20, 
                    alignItems: 'flex-start' // Align child elements to the left
                  }}
                >
                  {item.thumbnail && (
                    <Image
                      source={{ uri: item.thumbnail }}
                      style={{ width: '100%', height: 130*1.4 }}
                      resizeMode="contain"
                    />
                  )}
                  
                  <Text style={{ 
                    fontSize: 18, 
                    fontWeight: 'bold', 
                    textAlign: 'left', 
                    marginTop: 5
                  }}>
                    {item.title}
                  </Text>

                  <Text style={{ 
                    fontSize: 14, 
                    color: '#555', 
                    textAlign: 'left', 
                    marginTop: 3 
                  }}>
                    {item.description}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
   

  );
};

export default GetFeed;

