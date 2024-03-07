import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.bottomContainer}>
        
    </View>
  );
}

const styles = StyleSheet.create({
    bottomContainer: {
        color:"white",
        backgroundColor:"black",
        flex:1,
        justifyContent:"flex-end"
    }
});

export default Footer;