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
      <View style={{ marginTop: '10%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '90%'}}>
          
          <Button 
            title="Fetch RSS Feed" 
            onPress={fetchRSSFeed} 
          />

          {error ? (
            <Text style={{ marginBottom: 20, color: 'red', textAlign: 'center' }}>
              {error}
            </Text>
          ) : (
            <ScrollView 
              showsVerticalScrollIndicator={false} 
              contentContainerStyle={{ 
                marginTop: 30, 
                paddingRight: 10, 
                paddingBottom: 50, 
                alignItems: "center"
              }}
            >
              {feed.map((item, index) => (
                <View 
                  key={index} 
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
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
   

  );
};

export default GetFeed;

