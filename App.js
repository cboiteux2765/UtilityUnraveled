// App.js

import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, TouchableOpacity, Animated, Alert, Modal, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { t } from 'react-native-tailwindcss';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker'

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

export function Utility({ cap, lat, long, onPress, buttonWidth, buttonHeight, icon}) {
  const [capacity, setCapacity] = useState(cap);
  const [topSize, setTopSize] = useState(buttonHeight * (1 - capacity));
  const [bottomSize, setBottomSize] = useState(buttonHeight - topSize);

  useEffect(() => {
    setCapacity(cap);
    setTopSize(buttonHeight * (1 - capacity));
    setBottomSize(buttonHeight - topSize);
  }, [buttonHeight, cap]);

  return (
    <Marker
      coordinate={{
        latitude: lat,
        longitude: long,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={[
          t.itemsCenter,
          t.justifyCenter,
          {width: buttonWidth * 8},
          {height: buttonHeight * 8},
          t.rounded,
        ]}
      >
        <MaterialIcons name={icon} size={buttonWidth * 4} color="#000" />
        <View style={[t.bgRed500, {height: topSize * 4}, {width: buttonWidth * 4}, t.roundedT, t.itemsCenter, t.justifyCenter]}>
        </View>
        <View>
          {capacity !== 1.0 ? (
            <View style={[t.bgGreen500, {height: bottomSize * 4}, {width: buttonWidth * 4}, t.roundedB, t.itemsCenter, t.justifyCenter]}>
            </View>
          ) : (
            <View style={[t.bgGreen500, {height: bottomSize * 4}, {width: buttonWidth * 4}, t.rounded, t.itemsCenter, t.justifyCenter]}>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Marker>
  );
}

// Blank Screen with Map View
function BlankScreen({navigation}) {
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

  const [buttonHeight, setButtonHeight] = useState(-2222*region.latitudeDelta + 17.89);
  const [buttonWidth, setButtonWidth] = useState(buttonHeight / 2);

  // Button action function
  const handleButtonPress = () => {
    Alert.alert(
        "Marker Options ",
        "Select an action: ",
        [
            {text: 'Dismiss', style: 'cancel'},
            {
                text: 'Report Problem',
                onPress: () => navigation.navigate('ReportProblem', {region}),
            },
        ],
        {cancelable: true}
    );
  };

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

    setButtonHeight(newHeight);
    setButtonWidth(newHeight / 2);
  };

  return (
    <View style={[t.flex1]}>
      <MapView
        style={[t.flex1]}
        region={region}
        onRegionChangeComplete={handleRegionChange}
        showsUserLocation
      >
        <Utility // laundry SS West
          cap={0.5}
          lat={34.41047}
          long={-119.84535}
          onPress={handleButtonPress}
          buttonWidth={buttonWidth}
          buttonHeight={buttonHeight}
          icon="local-laundry-service"
        />

        <Utility // Mbath SS West
          cap={0.9}
          lat={34.41026}
          long={-119.84552}
          onPress={handleButtonPress}
          buttonWidth={buttonWidth}
          buttonHeight={buttonHeight}
          icon="man"
        />

        <Utility // Wbath SS West
          cap={1.0}
          lat={34.41079}
          long={-119.84513}
          onPress={handleButtonPress}
          buttonWidth={buttonWidth}
          buttonHeight={buttonHeight}
          icon="woman"
        />

        <Utility // laundry SS East
          cap={0.8}
          lat={34.41103}
          long={-119.84459}
          onPress={handleButtonPress}
          buttonWidth={buttonWidth}
          buttonHeight={buttonHeight}
          icon="local-laundry-service"
        />
      </MapView>
    </View>
  );
}

function ReportProblemScreen({ route }) {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [problemDetails, setProblemDetails] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { region } = route.params || {};
  const defaultLocation = region ? `Lat: ${region.latitude}, Lon: ${region.longitude}` : '';

  const handleSubmit = () => {
    Alert.alert('Report Submitted', 'Thank you for your report.');
  };

  // Toggle Modal Visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Handle location change from the Picker
  const handleLocationChange = (value) => {
    setLocation(value);
    toggleDropdown(); // Close modal after selection
  };

  return (
    <View style={[t.flex1, t.justifyStart, t.itemsCenter, t.bgTransparent, t.p5]}>
      <Text style={[t.text2xl, t.fontBold, t.mb5]}>Report a Problem</Text>
      <TextInput
        style={[t.wFull, t.p3, t.my2, t.roundedLg, t.border, t.bgTransparent, styles.inputPadding]}
        placeholder="Problem Description"
        onChangeText={setDescription}
        value={description}
      />
      {/* Custom Dropdown */}
    <View style={[t.wFull, t.my2]}>
      <TouchableOpacity
        style={[t.wFull, t.p3, t.py2, t.roundedLg, t.bgTransparent, t.border]}
        onPress={toggleDropdown}
      >
        <Text style={[t.textBase]}>{location || 'Select a location'}</Text>
      </TouchableOpacity>
      {dropdownVisible && (
        <Picker
          selectedValue={location}
          onValueChange={handleLocationChange}
          style={[t.wFull, t.bgTransparent, t.border, t.mt2, t.roundedLg]}
        >
          <Picker.Item label="Anacapa" value="Anacapa" />
          <Picker.Item label="Manzanita" value="Manzanita" />
          <Picker.Item label="San Miguel" value="San Miguel" />
          <Picker.Item label="San Nicolas" value="San Nicolas" />
          <Picker.Item label="San Rafael" value="San Rafael" />
          <Picker.Item label="Santa Catalina" value="Santa Catalina" />
          <Picker.Item label="Santa Cruz" value="Santa Cruz" />
          <Picker.Item label="Santa Rosa" value="Santa Rosa" />
        </Picker>
      )}
    </View>
    {/* Other Text Inputs */}
      <TextInput
        style={[t.wFull, t.p3, t.my2, t.roundedLg, t.border, t.bgTransparent, styles.inputPadding]}
        placeholder="Problem Details"
        onChangeText={setProblemDetails}
        value={problemDetails}
      />
      <TouchableOpacity
        style={[t.bgBlue500, t.wFull, t.p4, t.roundedLg, t.itemsCenter, t.my2]}
        onPress={handleSubmit}
      >
        <Text style={[t.textWhite, t.fontBold]}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContent: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalPadding: {
    marginVertical: 1, // Adjusts the padding within the modal
  },
  inputPadding: {
    marginVertical: 12, // Adds padding between text inputs
  },
});

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
                <Stack.Screen name="ReportProblem" component={ReportProblemScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
