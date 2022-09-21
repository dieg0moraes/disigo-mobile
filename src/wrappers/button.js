import React from 'react';
import { Text } from 'react-native';

const buttonStyles = {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    width: '50%',
    elevation: 3,
    margin: 10,
    color: 'white',
    borderRadius: 20,
    overflow:'hidden',
    backgroundColor: '#0D5DBC',
}

const Button = ({text, onPress, style, ...props}) => {

  const elementStyles = {...buttonStyles, ...style};

  return (
    <Text
      style={elementStyles}
      onPress={() => onPress()}
      props
    >
      { text }
    </Text>
  );
}

export default Button;
