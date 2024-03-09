import { StatusBar } from 'expo-status-bar';
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import './assets/UtilityUnraveled_Logo.png';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Signup from './components/Signup';
import tw from 'twrnc';

function HomeScreen({ navigation }) {
  return (
    <View style={tw`flex-1 justify-center items-center bg-green-300`}>
      <Image source={require('./assets/UtilityUnraveled_Logo.png')} style={{width:300, height:150}}></Image>
      
      <Text style={tw`text-black justify-center text-center`}>
        {"\n"}
        Welcome to Utility Unraveled!{"\n"}
        By SupremaCE: Clem, Mihir, and Will
      </Text>
      <TouchableOpacity style={tw`bg-teal-500 p-2 rounded-lg`}>
        <Button 
          title="Get Started" 
          color='blue'
          onPress={()=>navigation.navigate("Login")}
        ></Button>
      </TouchableOpacity>
      <StatusBar style='dark'></StatusBar>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          <Stack.Screen name="Signup" component={Signup}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
