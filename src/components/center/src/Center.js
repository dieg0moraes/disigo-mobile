import React from 'react';
import { View } from 'react-native';

const Center = ({ children, styles }) => {
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      ...styles,
    }}>
      {children}
    </View>
  );
}

export default Center;
