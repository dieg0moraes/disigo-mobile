import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import AuthService from '../../../services/AuthService';
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

  const handleSumbit = async () => {

    try {
      const data = {
        name: name,
        last_name: last_name,
        email: email,
        password: password,
        password_confirmation: passConfirmation,
        username: username,
        birthdate: transformToDateFormat(),
        contact_phone: contactPhone
      };
      console.log(data)
      await AuthService.userRegister(data);

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
        <Button style={styles.button} text="Go to back" onPress={() => {
            navigation.navigate('Login');
          }} />
      </Center>
    </>
  );
}

export default RegisterForm;
