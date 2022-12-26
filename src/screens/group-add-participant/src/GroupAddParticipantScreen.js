import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Center from '../../../components/center/';
import InputText from '../../../wrappers/text-input';
import Button from '../../../wrappers/button';
import { addParticipantToGroup } from '../../../stores/slices/groupsSlice';


const GroupAddParticipantScreen = ({ route }) => { 

  const [username, setUsername] = React.useState('');
  const group = route.params['group']

  const dispatcher = useDispatch();

  const handleAddParticipant = () => {
    dispatcher(addParticipantToGroup({username, groupId: group.expenses_group_id}))
  }


  return (

    <Center>
      <Text>Agregar por username</Text>
      <InputText
        placeholder='Username'
        style={{width: 200}}
        autoCapitalize='none'
        value={username}
        onChangeText={setUsername}
      />
      <Button onPress={handleAddParticipant} text={'Agregar'}/>
    </Center>
  )

}

export default GroupAddParticipantScreen;
