import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Home from './src/screens/Home';

const App = () => {
  console.log('logged inside chrome');
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaStyle}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={styles.safeAreaStyle.backgroundColor}
        />
        <Home />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: 'rgb(245, 240, 237)',
  },
});

export default App;
