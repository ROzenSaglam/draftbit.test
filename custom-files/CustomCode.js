// This import is required if you are defining react components in this module.
import React from 'react';

// Add any other imports you need here. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section.

// Define and export your components as named exports here.

import { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const DelayedButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  if (!isVisible) {
    return null; // Return nothing if the button should not be visible yet
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={
        () => navigation.navigate('UpcomingScreen')

        //navigation.navigate('HomeNavigator',{ screen: 'UpcomingScreen'})
      } // Navigate to "UpcomingTasks" screen on press
    >
      <Text style={styles.buttonText}>Continue</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7c4dff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
