import React from 'react';
import {Text, StyleSheet, TouchableHighlight} from 'react-native';

const AddNewCloseButton = ({onPress, content}) => (
  <TouchableHighlight style={styles.addNewContainer} onPress={onPress}>
    <Text style={styles.addNewIcon}>{content}</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  addNewContainer: {
    borderRadius: 40,
    width: 60,
    height: 60,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  addNewIcon: {
    color: 'white',
    fontSize: 30,
    marginTop: -5,
  },
});

export default AddNewCloseButton;
