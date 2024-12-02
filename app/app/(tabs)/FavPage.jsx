import { View, Text, ScrollView, Pressable, TextInput, Button, StyleSheet, Alert} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";

const FavPage = () => {
  return (
    <SafeAreaView style={{ flex: 1,}}>
      <View style={{ marginTop: 10, flex: 1, alignItems: 'center',}} >
        <View style={{ width: '90%'}}>
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ }}
          >
            <Text style={{fontSize: 24,fontWeight: 'bold',}}>Favourite Feeds</Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default FavPage