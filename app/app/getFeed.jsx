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
                />
              )}

              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
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
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    justifyContent: 'center',
  },
  feed: {
    marginTop: 20,
    width: '100%',
  },
  feedItem: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  thumbnail: {
    width: '20%',
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  error: {
    marginTop: 20,
    color: 'red',
  },
});