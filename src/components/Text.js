import React from 'react';
import {StyleSheet, Text} from 'react-native';

const PRText = ({children, style, ...restProps}) => (
  <Text
    {...restProps}
    style={[Array.isArray(style) ? [...style] : {...style}, styles.textStyle]}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  textStyle: {color: 'black'},
});

export default PRText;
