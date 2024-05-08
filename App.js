// App.js

import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { t } from 'react-native-tailwindcss';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// Create Stack Navigator
const Stack = createStackNavigator();

// Login Screen Component
function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Simulate a successful login check
        // if (email === 'test@example.com' && password === 'password123') {
        //     navigation.navigate('Blank'); // Navigate to Blank Page after successful login
        // } else {
        //     Alert.alert('Login Failed', 'Incorrect email or password.');
        // }
        navigation.navigate('Blank'); // bypass login system
    };

    return (
        <View style={[t.flex1, t.justifyCenter, t.itemsCenter, t.bgGray100, t.p5]}>
            <Text style={[t.text2xl, t.fontBold, t.mb5]}>Welcome Back!</Text>
            <TextInput
                style={[t.wFull, t.p3, t.my2, t.roundedLg, t.border, t.bgWhite]}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={[t.wFull, t.p3, t.y2, t.roundedLg, t.border, t.bgWhite]}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TouchableOpacity
                style={[t.bgBlue500, t.wFull, t.p4, t.roundedLg, t.itemsCenter, t.my2]}
                onPress={handleLogin}
            >
                <Text style={[t.textWhite, t.fontBold]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={[t.textBlue500, t.mt2]}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
}

// Blank Screen with Map View
function BlankScreen() {
  const [region, setRegion] = useState({
    latitude: 34.4104,
    longitude: -119.8448,
    latitudeDelta: 0.0087,
    longitudeDelta: 0.0058,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  const [barHeight, setBarHeight] = useState(15);
  const [barWidth, setBarWidth] = useState(barHeight / 2);
  const [capacity, setCapacity] = useState(0.8);
  const [topSize, setTopSize] = useState(barHeight * (1 - capacity));
  const [bottomSize, setBottomSize] = useState(barHeight - topSize);

  // Button action function
  const handleButtonPress = () => {
    alert("Button Pressed\n"
      + "Latitute: " + region.latitude + "\n"
      + "Longitude: " + region.longitude + "\n"
      + "Latitude Delta: " + region.latitudeDelta + "\n"
      + "Longitude Delta: " + region.longitudeDelta
    );
  }

  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);

    const maxHeight = 15;
    const disappearThreshold = 0.006;
    let newHeight;
    if (newRegion.latitudeDelta > disappearThreshold) {
      newHeight = 0;
    } else {
      newHeight = Math.min(maxHeight, -2222*newRegion.latitudeDelta + 17.89);
    }

    setBarHeight(newHeight);
    setBarWidth(newHeight / 2);
    setTopSize(newHeight * (1 - capacity));
    setBottomSize(newHeight - topSize);
  };

  return (
    <View style={[t.flex1]}>
      <MapView
        style={[t.flex1]}
        region={region}
        onRegionChangeComplete={handleRegionChange}
        showsUserLocation
      >
        <Marker
          coordinate={{
            latitude: 34.41047,
            longitude: -119.84535,
          }}
        >
          <TouchableOpacity
            onPress={handleButtonPress}
            style={[
              t.itemsCenter,
              t.justifyCenter,
              {width: barWidth * 8},
              {height: barHeight * 8},
              t.rounded,
            ]}
          >
            <MaterialIcon name="local-laundry-service" size={barWidth * 4} color="#000" />
            <View style={[t.bgRed500, {height: topSize * 4}, {width: barWidth * 4}, t.roundedT, t.itemsCenter, t.justifyCenter]}>
            </View>
            <View style={[t.bgGreen500, {height: bottomSize * 4}, {width: barWidth * 4}, t.roundedB, t.itemsCenter, t.justifyCenter]}>
            </View>
          </TouchableOpacity>
        </Marker>
      </MapView>
    </View>
  );
}

// Signup Screen (Placeholder)
function SignupScreen() {
    return (
        <View style={[t.flex1, t.justifyCenter, t.itemsCenter, t.bgGray100, t.p5]}>
            <Text style={[t.text2xl, t.fontBold]}>Signup Screen Placeholder</Text>
        </View>
    );
}

// Navigation Setup
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Blank" component={BlankScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
