import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView } from 'react-native';
import AuthService from '../../../services/AuthService';

import DateTimePicker from '@react-native-community/datetimepicker';

import DatePicker from 'react-native-datepicker'

import Center from '../../../components/center';
import { styles } from '../lib/styles';
import InputText from '../../../wrappers/text-input';
import Button from '../../../wrappers/button';


const RegisterForm = ({ navigation, onErrorCallback, okCallback }) => {
  const [ birthdate, setBirthdate ] = useState('');
  const [ name, setName ] = useState('');
  const [ last_name, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passConfirmation, setPassConfirmation ] = useState('');
  const [ date, setDate ] = useState(new Date());
  const [ contactPhone, setContactPhone ] = useState('');

  const [ day, setDay ] = useState(1);
  const [ month, setMonth ] = useState(1);
  const [ year, setYear ] = useState(1);

  const handleSumbit = async () => {

    try {
      const data = {
        name: name,
        last_name: last_name,
        email: email,
        password: password,
        password_confirmation: passConfirmation,
        username: username,
        birthdate: $`{year}/{month}/{day}`,
        contact_phone: contactPhone
      };
      const response = await AuthService.userRegister(data);
      console.log(response)

      okCallback()

    } catch(error) {
      // TODO: Handle error
      onErrorCallback(error)
    }
  }

  const transformToDateFormat = () => {
    console.log(date.toString())
    return date.toString()
  }


  return (
    <>
      <Center >
        <InputText
          style={{width: 200}}
          placeholder='Nombre'
          value={name}
          onChangeText={setName}
          autoCapitalize='none'
        />
        <InputText
          placeholder='Apellido'
          style={{width: 200}}
          value={last_name}
          onChangeText={setLastName}
          autoCapitalize='none'
        />
        <InputText
          placeholder='Nombre de usuario'
          style={{width: 200}}
          value={username}
          autoCapitalize='none'
          onChangeText={setUsername}
        />
        <View style={{ display: 'flex', flexDirection:'row'}}>
          <InputText
            width='15%'
            placeholder='Anio'
            value={year}
            onChangeText={setYear}
            keyboardType='numeric'
          />
          <InputText
            width='15%'
            placeholder='Mes'
            value={month}
            onChangeText={setMonth}
            keyboardType='numeric'
          />
          <InputText
            width='15%'
            placeholder='Dia'
            value={day}
            onChangeText={setDay}
            keyboardType='numeric'
          />

        </View>
        <InputText
          placeholder='Email'
          value={email}
          autoCapitalize='none'
          style={{width: 200}}
          onChangeText={setEmail}
        />
        <InputText
          placeholder='Telefono'
          value={contactPhone}
          autoCapitalize='none'
          style={{width: 200}}
          onChangeText={setContactPhone}
        />
        <InputText
          placeholder='Password'
          secureTextEntry={ true }
          value={password}
          autoCapitalize='none'
          style={{width: 200}}
          onChangeText={setPassword}
        />
        <InputText
          value={passConfirmation}
          onChangeText={setPassConfirmation}
          placeholder='Confirmacion de password'
          autoCapitalize='none'
          style={{width: 200}}
          secureTextEntry={ true }
        />
        <Button
          style={styles.button}
          text='Registrarse'
          style={{width: 200}}
          onPress={handleSumbit}
        />
        <Button
            style={styles.button} text="Go to back" onPress={() => {
            navigation.navigate('Login');
          }} />
      </Center>
    </>
  );
}

export default RegisterForm;
