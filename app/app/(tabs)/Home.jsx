import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react';
import GetFeed from '../getFeed'
import { SafeAreaView } from "react-native-safe-area-context";

import BBCLogo from "../../assets/icons/BBC_News_2019.svg"
import SkyLogo from "../../assets/icons/Sky-news-logo.svg"

const Home = () => {
  const [feedOptions, setFeedOptions] = useState([
    { id: 1, name: "BBC News", selected: true, component: BBCLogo, link: "https://feeds.bbci.co.uk/news/rss.xml"},
    { id: 2, name: "Sky News", selected: false, component: SkyLogo, link: "https://feeds.skynews.com/feeds/rss/home.xml" },
    { id: 3, name: "Sky News", selected: false, component: SkyLogo, link: "https://www.espn.com/espn/rss/news" },
  ]);

  const addOption = ({platformName}) => {
    const newOption = { id: feedOptions.length + 1, name: platformName, selected: false };
    setFeedOptions(prevOptions => [...prevOptions, newOption]);
  };
  

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{height: 60, backgroundColor: "#161622",borderTopWidth: 1,borderTopColor: "#232533",}} >
        <ScrollView horizontal={true}>
          {feedOptions.map((feed) => {
            const IconComponent = feed.component; // Extract the SVG component
            return (
              <Pressable key={feed.id} style={{marginTop: 5, marginLeft: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2}}
                onPress={() => {
                  setFeedOptions(prev => prev.map(item => ({
                    ...item,
                    selected: item.id === feed.id // Set clicked item to selected
                  })));
                }}
              >
                <IconComponent width={20} height={20} />
                <Text style={{color: feed.selected ? "#FFA001" : "#CDCDE0"}}>{feed.name}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      
      <GetFeed currentFeeds={feedOptions}/>
    </SafeAreaView>
  )
}

export default Home