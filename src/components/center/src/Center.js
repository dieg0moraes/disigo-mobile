import React from 'react';
import { View } from 'react-native';

const Center = ({ children, styles }) => {
  return (
    <View style={{
      ...styles,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {children}
    </View>
  );
}

export default Center;
