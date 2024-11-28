import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const GetFeed = () => {
  const [feed, setFeed] = useState([]);
  const [error, setError] = useState('');

  const fetchRSSFeed = async () => {
    const feedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/news/rss.xml'; // Replace with your RSS feed URL

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

  return (
  <SafeAreaView style={{ backgroundColor: '#3498db', flex: 1}}>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flex: 1, paddingHorizontal: 16 }}>
          
          <Button 
            title="Fetch RSS Feed" 
            onPress={fetchRSSFeed} 
          />

          {error ? (
            <Text style={{ marginTop: 20, color: 'red' }}>
              {error}
            </Text>
          ) : (
            <ScrollView contentContainerStyle={{ height: '100%'}}>
              {feed.map((item, index) => (
                <View key={index}>
                  {item.thumbnail && (
                    <Image
                      source={{ uri: item.thumbnail }}
                      style={{ width: 240, height: 130 }}
                      resizeMode="contain"
                    />
                  )}
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default GetFeed;

const styles = StyleSheet.create({
  container: {  
    marginTop: "10%",
    marginLeft: 8,
    marginRight: 8,
  },
  feed: {
    marginTop: 10,
    alignSelf: 'center',
  },
  feedItem: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
  },
  thumbnail: {
    width: '90%', // Ensures the image takes 80% of the container's width
    height: undefined, // Let the aspect ratio determine the height
    aspectRatio: 16 / 9, // Adjust aspect ratio to your expected image shape, or remove this if dynamic
    resizeMode: 'contain', // Keeps the image quality and aspect ratio
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 8, // Add horizontal padding inside feed item
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 8, // Add horizontal padding inside feed item
    marginBottom: 8,
  },
  error: {
    marginTop: 20,
    color: 'red',
  },
});