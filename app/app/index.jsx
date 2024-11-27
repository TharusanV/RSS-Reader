import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView 
        contentContainerStyle={{height: "100%",}}
      >
        <View style={styles.view}>
          <Text>Welcome</Text>
          <Link href="/Home" style={{color: 'blue'}}>Home</Link>
        </View>
      </ScrollView>
      
      <StatusBar style="auto" />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    backgroundColor: '#fff',
    height: '100%'
  },

  scrollview: {

  },

  view: {
    width: '100%', // `w-full`
    flex: 1, // `flex` (takes up the full available space)
    justifyContent: 'center', // `justify-center`
    alignItems: 'center', // `items-center`
    height: '100%', // `h-full`
    paddingHorizontal: 16, // `px-4` (4 * 4px = 16px)
  }

});