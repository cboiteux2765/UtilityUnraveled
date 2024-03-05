import { StatusBar } from 'expo-status-bar';
import { Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import './assets/UtilityUnraveled_Logo.png';
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
      <View style={styles.container}>
        <Image source={require('./assets/UtilityUnraveled_Logo.png')} style={{width:300, height:150}}></Image>
        
        <Text style={{textAlign:"center"}}>
          {"\n"}
          Welcome to Utility Unraveled!{"\n"}
          By SupremaCE: Clem, Mihir, and Will
        </Text>
        <Button title="Get Started" color='red'></Button>
        <StatusBar style="auto" />
      </View>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
