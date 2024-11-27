import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';

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
        console.log(json.items); // Contains parsed feed items
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
    <View style={styles.container}>
      <Button title="Fetch RSS Feed" onPress={fetchRSSFeed} />
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <ScrollView style={styles.feed}>
          {feed.map((item, index) => (
            <View key={index} style={styles.feedItem}>
              {/*If the thumbnail exists then do the follow*/}
              {item.thumbnail && (
                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.thumbnail}
                  resizeMode="contain"
                />
              )}

              <Text style={styles.title}>{item.title}</Text>
              {/*<Text style={styles.description}>{item.description}</Text>*/}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default GetFeed;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  feed: {
    marginTop: 10,
    alignSelf: 'center',
  },
  feedContent: {
   
  },
  feedItem: {
    width: "90%", // Fixed width for each feed item
    margin: 8,  // Add margin around each item
    backgroundColor: '#f9f9f9', 
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnail: {
    width: 300,
    height: 200, 
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