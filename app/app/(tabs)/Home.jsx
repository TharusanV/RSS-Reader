import { View, Text } from 'react-native'
import React from 'react'
import GetFeed from '../getFeed'
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{backgroundColor: '#f8f8f8',padding: 16,borderBottomWidth: 1,borderBottomColor: '#ddd',}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Welcome to Home</Text>
      </View>
      
      <GetFeed />
    </SafeAreaView>
  )
}

export default Home