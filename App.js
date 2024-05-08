// App.js

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { t } from 'react-native-tailwindcss';

// Create Stack Navigator
const Stack = createStackNavigator();

// Login Screen Component
function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Simulate a successful login check
        if (email === 'test@example.com' && password === 'password123') {
            navigation.navigate('Blank'); // Navigate to Blank Page after successful login
        } else {
            Alert.alert('Login Failed', 'Incorrect email or password.');
        }
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
                style={[t.wFull, t.p3, t.my2, t.roundedLg, t.border, t.bgWhite]}
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
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState({
        latitude: 34.4140,
        longitude: -119.8489,
        latitudeDelta: 0.00622,
        longitudeDelta: 0.0121,
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
            setRegion({
                ...region,
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            });
        })();
    }, []);

    return (
        <View style={[t.flex1, t.bgWhite]}>
            <MapView
                style={[t.flex1]}
                region={region}
                showsUserLocation
                showsMyLocationButton
            >
                {location && (
                    <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
                )}
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
