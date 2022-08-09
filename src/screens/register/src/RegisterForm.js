import React, { useState } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import AuthService from '../../../services/AuthService';
import DatePicker from 'react-native-datepicker'

import Center from '../../../components/center';

import { styles } from '../lib/styles';

const RegisterForm = () => {
  const [ birthdate, setBirthdate ] = useState('');
  const [ name, setName ] = useState('');
  const [ last_name, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passConfirmation, setPassConfirmation ] = useState('');
  const [ date, setDate ] = useState(new Date());

  const handleSumbit = async () => {

    try {
      const data = {
        name: name,
        last_name: last_name,
        email: email,
        password: password,
        password_confirmation: passConfirmation,
        username: username,
        birthdate: transformToDateFormat()
      };
      const response = await AuthService.userRegister(data);
    } catch(error) {
      // TODO: Handle error
      console.log();
    }
  }

  const transformToDateFormat = () => {
    return date.toString()
  }


  return (
    <View>
      <Center>
        <TextInput
          placeholder='Nombre'
          value={name}
          style={{width: 250}}
          onChangeText={setName}
          autoCapitalize='none'
        />
        <TextInput
          placeholder='Apellido'
          value={last_name}
          style={{width: 250}}
          onChangeText={setLastName}
          autoCapitalize='none'
        />
        <TextInput
          placeholder='Nombre de usuario'
          value={username}
          style={{width: 250}}
          autoCapitalize='none'
          onChangeText={setUsername}
        />
        <DatePicker
            style={{width: 200}}
            date={date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="1950-05-01"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            iconSource={{uri: ''}}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={setDate}
          />
        <TextInput
          placeholder='Email'
          style={{width: 250}}
          value={email}
          autoCapitalize='none'
          onChangeText={setEmail}
        />
        <TextInput
          placeholder='Password'
          secureTextEntry={ true }
          style={{width: 250}}
          value={password}
          autoCapitalize='none'
          onChangeText={setPassword}
        />
        <TextInput
          value={passConfirmation}
          onChangeText={setPassConfirmation}
          placeholder='Confirmacion de password'
          autoCapitalize='none'
          style={{width: 250}}
          secureTextEntry={ true }
        />
        <Button
          style={styles.button}
          title="Registrarse"
          onPress={handleSumbit}
        />
      </Center>
    </View>
  );
}

export default RegisterForm;
