import React from 'react';

import { TextInput } from 'react-native';


const inputStyles = {
    height: 50,
    margin: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    textAlign: 'center',
}

const InputText = ({style, ...props}) => {

  const elementStyles = { ...inputStyles, ...style }

  return (
    <TextInput
     {...props}
      style={elementStyles}
    />
  );
}

export default InputText;
