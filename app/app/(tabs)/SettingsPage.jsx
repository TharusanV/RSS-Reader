import { View, Text, ScrollView, Pressable, TextInput, Button, StyleSheet, Alert} from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsPage = () => {

  const [rssFeeds, setRssFeeds] = useState([]);

  const [addFeedFormData, setAddFeedFormData] = useState({
    name: '',
    link: '',
  });

  const handleInputChange = (field, value) => {
    setAddFeedFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem(
        `@rss_feed_${addFeedFormData.name}`, //Key
        JSON.stringify(addFeedFormData) //Value
      );

      Alert.alert("Success", "RSS Feed saved successfully!");
      //console.log("Data saved:", addFeedFormData);

      // Reset form fields
      getRssFeeds();
      setAddFeedFormData({ name: '', link: '' });
    } 
    catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "Failed to save RSS feed. Please try again.");
    }
  };

  const getRssFeeds = async () => {
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
  
      console.log("RSS Feeds:", rssFeeds);
      setRssFeeds(rssFeeds);
    } 
    catch (error) {
      console.error("Error retrieving RSS feeds:", error);
    }
  };


  useEffect(() => {
    getRssFeeds();
  }, []); 

  

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{ marginTop: 10, flex: 1, alignItems: 'center',}} >
        <View style={{ width: '90%'}}>
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ }}
          >
            <Text style={{fontSize: 24,fontWeight: 'bold',}}>Add RSS Feed</Text>
            <View>
              <Text style={{}}>Feed Name:</Text>
              <TextInput
                style={{}}
                placeholder="Name"
                value={addFeedFormData.name}
                onChangeText={(value) => handleInputChange('name', value)}
              />

              <Text style={{}}>RSS URL:</Text>
              <TextInput
                style={{}}
                placeholder="RSS Link"
                value={addFeedFormData.link}
                onChangeText={(value) => handleInputChange('link', value)}
              />

              <View style={{}}>
                <Button title="Submit" onPress={handleSubmit} />
              </View>
            </View>

            <Text style={{fontSize: 24,fontWeight: 'bold', marginTop: 15}}>Delete RSS Feed</Text>
            <View>
              {rssFeeds.map((item, name) => (
                <View key={name}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'left', marginTop: 5}}>
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>

          </ScrollView>
        </View>
      </View>
      
    </SafeAreaView>
  )
}

export default SettingsPage