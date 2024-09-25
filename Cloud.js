// Cloud.js
import React from 'react';
import { Animated, Image, StyleSheet } from 'react-native';

const Cloud = ({ translateX }) => {
  return (
    <Animated.View style={[styles.cloud, { transform: [{ translateX }] }]}>
      <Image source={require('./assets/cloud2.png')} style={styles.cloudImage} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cloud: {
    position: 'absolute',
    top: Math.random() * 100, // Randomize vertical position
    width: 200, // Adjust cloud size
    height: 900, // Adjust cloud size
  },
  cloudImage: {
    width: '100%',
    height: '200px',
    resizeMode: 'contain',
  },
});

export default Cloud;
