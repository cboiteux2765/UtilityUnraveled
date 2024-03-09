import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Image } from 'react-native';
import tw from 'twrnc';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Footer = ({ navigation }) => {
  return (
    <View style={styles.bottomContainer}>
      <Image style={tw``} source={require('../assets/home.png')}></Image>
      <Image style={tw``} source={require('../assets/map.png')}></Image>
      <Image style={tw``} source={require('../assets/settings.png')}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
    bottomContainer: {
      flex:1,
      justifyContent:"flex-end",
      flexDirection:'row'
    }
});

export default Footer;