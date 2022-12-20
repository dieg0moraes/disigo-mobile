import React from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { createGroup } from '../../../stores/slices/groupsSlice';

import Center from '../../../components/center';
import InputText from '../../../wrappers/text-input';
import Button from '../../../wrappers/button';


const AddGroupScreen = ({ navigation }) => {

  const [ name, setName ] = React.useState();

  const dispatcher = useDispatch();

  const submitHandler = () => {
    if (name) {
      dispatcher(createGroup({
        'name': name
      }))
    }
  }

  return (
    <Center>
      <Text>Crear un nuevo grupo</Text>
      <InputText
        style={{width: '50%'}}
        value={name}
        onChangeText={setName}
        placeholder='Nombre'
      />
      <Button
        text='Crear'
        onPress={submitHandler}
      />
    </Center>
  )

}

export default AddGroupScreen;
