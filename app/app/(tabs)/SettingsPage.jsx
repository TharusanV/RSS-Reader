import { View, Text, ScrollView, Pressable, TextInput, Button, StyleSheet, Alert, TouchableOpacity} from 'react-native'
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

  const deleteItemByKey = async (key) => {
    try {
      await AsyncStorage.removeItem(`@rss_feed_${key}`); // Remove the item with the given key
      console.log(`Deleted item with key: ${key}`);

      setRssFeeds((prevFeeds) => prevFeeds.filter((item) => item.name !== key));
    } catch (error) {
      console.error(`Error deleting item with key ${key}:`, error);
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
  
      //console.log("RSS Feeds:", rssFeeds);
      setRssFeeds(rssFeeds);
    } 
    catch (error) {
      console.error("Error retrieving RSS feeds:", error);
    }
  };


  useEffect(() => {
    getRssFeeds();
  }, []); 

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
            <Text style={{fontSize: 24,fontWeight: 'bold',color: textColour,}}>Add RSS Feed</Text>
            <View>
              <Text style={{color: textDescriptionColour,}}>Feed Name:</Text>
              <TextInput
                style={{color: textDescriptionColour,}}
                placeholder="Name"
                value={addFeedFormData.name}
                onChangeText={(value) => handleInputChange('name', value)}
              />

              <Text style={{color: textDescriptionColour,}}>RSS URL:</Text>
              <TextInput
                style={{color: textDescriptionColour,}}
                placeholder="RSS Link"
                value={addFeedFormData.link}
                onChangeText={(value) => handleInputChange('link', value)}
              />

              <View style={{}}>
                <Button title="Submit" onPress={handleSubmit} />
              </View>
            </View>

            <Text style={{fontSize: 24,fontWeight: 'bold', marginTop: 15, color: textColour,}}>Delete RSS Feed</Text>
            <View style={{}}>
              {rssFeeds.map((item, name) => (
                <View key={name} style={{}}>
                  <TouchableOpacity onPress={() => deleteItemByKey(item.name)} style={{}}>
                    <Text style={{color: 'red',fontSize: 18,fontWeight: 'bold', textAlign: 'left', marginTop: 5}}>- {item.name}</Text>
                  </TouchableOpacity>
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