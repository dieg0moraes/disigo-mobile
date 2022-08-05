import React, { useState } from 'react';
import { View, TextInput, Text, Button } from 'react-native';

import Center from '../../../components/center';
//import { showOkDialog } from '../../commonActions/index';

import { styles } from '../lib/styles';

const RegisterForm = () => {
    const [ birthdate, setBirthdate ] = useState('');
    const [ name, setName ] = useState('');
    const [ last_name, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passConfirmation, setPassConfirmation ] = useState('');

    const handleSumbit = async () => {

        try{
            const data = {
                name: name,
                last_name: last_name,
                email: email,
                password: password,
                password2: passConfirmation,
                username: username,
                birthdate: birthdate
            };

            // const response = await AuthService.userRegister(data);
            let buttons = [];
            const buttonOk = {
              text: 'Ok',
              title: 'Usuario registrado'
            }
            buttons.push(buttonOk);
    //        showOkDialog('Registro completo', 'Registro completo', buttons);
        } catch(error) {
            const button = {
              text: 'Ok',
              title: 'error'
            }
  //          showOkDialog('Fail', error.message, [button]);
        }
    }

    return (
        <View>
            <Center>
              <TextInput
                placeholder='Nombre'
                value={name}
                onChangeText={setName}
              />
              <TextInput
                placeholder='Apellido'
                value={last_name}
                onChangeText={setLastName}
              />
              <TextInput
                placeholder='Nombre de usuario'
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                placeholder='Password'
                secureTextEntry={ true }
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                value={passConfirmation}
                onChangeText={setPassConfirmation}
                placeholder='Confirmacion de password'
                secureTextEntry={ true }
              />
                <Button style={styles.button} title="Registrarse"/>
            </Center>
        </View>
    );
}

export default RegisterForm;
